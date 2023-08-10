const express = require("express"); // importing express dependency.
const { chats } = require("./data/data.js");
const dotenv = require("dotenv"); //accessing the env variables.
const connectDB = require("./config/dbconfig");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware.js");
const path = require("path");

dotenv.config(); //configuring the dotenv package.
connectDB();
const app = express(); //creating instance for express.
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/otp", verificationRoutes);

//--------------Deployment---------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}

//--------------Deployment---------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; //hiding the port value to public.

const server = app.listen(
  PORT,
  console.log(`Server started at Port ${PORT}`.yellow.bold)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room " + room);
    // socket.emit("connected");
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userid === newUserId)) {
      activeUsers.push({
        userid: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected Users", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnected", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
    console.log("User Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});
