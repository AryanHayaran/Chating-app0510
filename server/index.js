const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server, {
  cors: true,
});

io.on("connection", (socket) => {
  // console.log(`User Connected : ${socket.id}`);

  // socket.on("send_message", (data) => {
  //     // console.log(data);
  //     socket.broadcast.emit("receive_message", data);
  // })
  socket.on("join_room", (data) => {
    console.log(`connected ${socket.id}`);
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log("server is running");
});
