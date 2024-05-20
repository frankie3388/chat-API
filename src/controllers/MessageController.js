const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/UserModel");
const { ProductPost } = require("../models/ProductPostModel");
const { authenticateJWT } = require('../middleware/AuthMiddleware');
const { Chat } = require("../models/ChatModel");
const { Message } = require("../models/MessageModel");

// Send message route - the id is the userId you want to send the message to.
// A request is recieved from the message page of the frontend.
router.post("/send/:id", authenticateJWT, async (request, response) => {
    try {
        const { message } = request.body;
        console.log(message);
        const { id: receiverId } = request.params;
        const senderId = request.user.userId;
        console.log(senderId);

        let chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            chat.messages.push(newMessage._id);
        }

        // await newMessage.save();
        // await chat.save();

        // this will run in parallel
		await Promise.all([chat.save(), newMessage.save()]);
        

        response.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message: ", error.message)
        response.status(500).json({ error: "Internal server error"});
    }
})

// Send message route - the id is the postId. Need to find user through postId,
// then use userId to send the message to the user who made the post.
// A request is received from the ProductPost page from the frontend.
router.post("/sendMessage/:id", authenticateJWT, async (request, response) => {
    try {
        const { message } = request.body;
        console.log(message);
        const { id: postId } = request.params;
        const senderId = request.user.userId;
        console.log(senderId);

        let receiverPostId = await ProductPost.findOne({
            "_id": postId
        }).populate("user")

        let receiverId; // Declare receiverId outside the if block

        if (receiverPostId) {
            receiverId = receiverPostId.user._id.toString();
            console.log(receiverPostId);
            console.log(receiverId);
        } else {
            console.log("No post found with the given ID.");
        }

        let chat = await Chat.findOne().populate({
            path: 'messages',
            populate: {
              path: 'productPost',
              match: { _id: postId }
            }
            }).exec();
          
            if (chat && chat.messages.some(message => message.productPost && message.productPost._id.equals(postId))) {
              // The chat contains a message with the specified productPostId
              console.log('Chat found:', chat);
            } else {
              // No chat found with the specified productPostId
              console.log('No chat found with the specified productPostId');
              chat = await Chat.create({
                participants: [senderId, receiverId],
                });
        }

        // if (!chat) {
        //     chat = await Chat.create({
        //         participants: [senderId, receiverId],
        //     });
        // }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            productPost: postId,
        });

        if (newMessage) {
            chat.messages.push(newMessage._id);
        }

        // await newMessage.save();
        // await chat.save();

        // this will run in parallel
		await Promise.all([chat.save(), newMessage.save()]);
        

        response.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message: ", error.message)
        response.status(500).json({ error: "Internal server error"});
    }
})

// get all messages from a chat that matches the senderId and receiverId
router.get("/:id", authenticateJWT, async (request, response) => {
    try{
        const { id: userToChatId} = request.params;
        const senderId = request.user.userId;

        const chat = await Chat.find({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        

        if (!chat) return response.status(200).json({ message: "No chat available" })

        response.status(200).json(chat)
    } catch(error) {
        console.log("Error in getting message: ", error.message)
        response.status(500).json({ error: "Internal server error"});
    }
})

// get all chats that the logged in user is involved in to display on the sidebar
router.get("/", authenticateJWT, async (request, response) => {
    try{
        const senderId = request.user.userId;

        const chats = await Chat.find({
            "participants": senderId
        })
        .populate({
            path: "messages",
            populate: { path: "productPost" } // Populate the productPost field inside each message
        })
        .populate("participants");

        console.log(chats)

        if (!chats) return response.status(200).json({ message: "No chat available" })

        response.status(200).json(chats)
    } catch(error) {
        console.log("Error in getting message: ", error.message)
        response.status(500).json({ error: "Internal server error"});
    }
})

module.exports = router;