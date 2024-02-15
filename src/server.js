const express = require('express');
const ws = require("ws");

// make a server instance 
const app = express();



// CORS required to connect to frontend
const cors = require('cors');

const corsOptions = {
    //            frontend localhost,  frontend deployed
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
}



app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (request, response) => {
    response.json({
        message:"Hello world"
    });
});

// PORT for Websocketserver
const server = app.listen(4040);

const wss = new ws.WebSocketServer({server});

wss.on('connection', (connection, request) => {
    console.log(request.headers);
    
})

// Routes
// app.use("/users", require("./controllers/UserController"));

// const UserRouter = require('./controllers/UserController');
// app.use('/users', UserRouter);

// app.use("/productpost", require("./controllers/ProductPostController"));


module.exports = {
    app
}