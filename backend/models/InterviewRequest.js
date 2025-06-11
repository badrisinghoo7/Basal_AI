const mongoose = require('mongoose');

const interviewRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'accepted'],
      message: 'Status must be either pending or accepted'
    },
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  acceptedAt: {
    type: Date
  }
}, {
  timestamps: true
});


const InterViewModel = mongoose.model('InterviewRequest', interviewRequestSchema);

module.exports = {InterViewModel}