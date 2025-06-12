const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const interviewRequestRoutes = require('./routes/interviewRequests');
const UserRouter = require('./routes/userRoute');

const app = express();
app.use(express.json());
const server = http.createServer(app);

// Setup Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});


connectDB();

app.use(cors({
  origin: "*"
}));
app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/api/interview-requests', interviewRequestRoutes);
app.use("/api/user",UserRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'Job Platform Backend API',
  });
});


io.on('connection', (socket) => {
  // console.log('Client connected:', socket.id);

  socket.on('join-recruiter-room', (data) => {
    socket.join('recruiters');
    // console.log(`Socket ${socket.id} joined recruiters room data`, data);
  });

  socket.on('disconnect', () => {
    // console.log('Client disconnected:', socket.id);
  });
});


app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Socket.io ready for real-time connections`);
});

module.exports = { app, server, io };
