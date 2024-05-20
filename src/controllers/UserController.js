const express = require("express");
const router = express.Router();
const { User } = require("../models/UserModel");
const { authenticateJWT } = require('../middleware/AuthMiddleware');

router.get("/", authenticateJWT, async (request, response) => {
    try {
        const loggedInUserId = request.user.userId;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		response.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getting users: ", error.message)
        response.status(500).json({ error: "Internal server error"});
    }
})


module.exports = router;