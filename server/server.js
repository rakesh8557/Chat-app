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
    console.log("a new connection");

    socket.on("disconnect", () => {
        console.log("User got discoonected");
    })
})

server.listen(process.env.PORT, () => console.log(`server started at ${process.env.PORT}`));