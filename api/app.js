import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CLIENT_URL 
      : 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(dirname, '../client/dist');
  // Serve static files
  app.use(express.static(clientBuildPath));
  // Handle client-side routing
  app.get('*', (req, res) => {
    // Check if the request is for a static asset
    if (req.url.startsWith('/assets/')) {
      // If it's a static asset, try to serve it directly
      const assetPath = path.join(clientBuildPath, req.url);
      if (path.extname(assetPath)) {
        return res.sendFile(assetPath);
      }
    }
    // For all other routes, send the index.html file
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Socket.IO logic
let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log('A user connected');

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    console.log('User disconnected');
    removeUser(socket.id);
  });
});

// const PORT = process.env.PORT || 8800;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}!`);
// });

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
  console.log(`Socket.IO server is ready to accept connections`);
});