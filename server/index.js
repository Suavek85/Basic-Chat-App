const server = require("http").createServer();
const io = require("socket.io")(server);

const MESSAGE_EVENT = "newChatMessage";
const TYPING = "typing";
const PORT = 5000;

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

  //added
  socket.on('test2', (data) => {
    io.in(roomId).emit('test2', data);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`); //TODO: why does it output 3 different socket.ids?
    io.in(roomId).emit('test', { id: socket.id});
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});