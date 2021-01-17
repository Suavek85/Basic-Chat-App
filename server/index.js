const MESSAGE_EVENT = "newChatMessage";
const TYPING = "typing";
const ADD_USER = "adduser";
const REMOVE_USER = "removeuser";
const PORT = 5000;

var serverUsers = [];

const requestListener = function (req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Content-Type': 'application/json'
  };
  res.writeHead(200, headers);
  res.end(JSON.stringify({ serverUsers }));
}
const server = require("http").createServer(requestListener);
const io = require("socket.io")(server);

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

  socket.on(ADD_USER, (data) => {
    serverUsers.push(data);
    const chatUsers = serverUsers.filter(el => el.roomId === roomId );
    io.in(roomId).emit(ADD_USER, chatUsers)
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    const filtered = serverUsers.filter(el => socket.id !== el.senderId);
    serverUsers = [...filtered]
    const chatUsers = serverUsers.filter(el => el.roomId === roomId );
    io.in(roomId).emit(REMOVE_USER, chatUsers ); 
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});