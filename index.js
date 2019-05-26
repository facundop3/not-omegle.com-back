const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const roomPerId = new Map();
app.get("/", function(req, res) {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", function(socket) {
  console.log("a user connected", socket.id);
  //   console.log(socket);
  socket.on("create-room-data", data => {
    console.log("create-room-data");
    roomPerId.set(socket.id, data);
  });

  socket.on("connect-to-room", roomId => {
    console.log("connect-to-room: ", roomId);
    console.log(roomPerId[roomId]);
    socket.to(socket.id).emit("room-connection-data", roomPerId[roomId]);
  });
});

http.listen(3030, function() {
  console.log("listening on *:3030");
});
