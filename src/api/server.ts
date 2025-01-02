import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../../src/index.html"));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});