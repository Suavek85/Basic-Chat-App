const server = require("http").createServer();
const io = require("socket.io")(server);
const MESSAGE_EVENT = "newChatMessage";
const TYPING = "typing";
const PORT = 5000;
var serverUsers = [];

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on(MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(MESSAGE_EVENT, data);
  });

  socket.on(TYPING, (data) => {
    io.in(roomId).emit(TYPING, data);
  });

  socket.on('adduser', (data) => {
    serverUsers.push(data);
    const chatUsers = serverUsers.filter(el => el.roomId === roomId )
    io.in(roomId).emit('adduser', chatUsers)
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    io.in(roomId).emit('removeuser', { id: socket.id });
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});