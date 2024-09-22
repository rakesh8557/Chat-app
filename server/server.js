require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    socket.emit("newMessage" , {
        "from" : "Admin",
        "text" : "Welcome To the Chat"
    })

    socket.broadcast.emit("newMessage" , {
        "from" : "Admin",
        "text" : "A new user joined"
    })

    socket.on("clientMessage", (message) => {
        // console.log("clientmessage", message);

        io.emit("newMessage", {
            from : message.from,
            text : message.text,
            createdAt : new Date().getTime()
        })

    })

    socket.on("disconnect", () => {
        console.log("User got discoonected");
    })
})

server.listen(process.env.PORT, () => console.log(`server started at ${process.env.PORT}`));