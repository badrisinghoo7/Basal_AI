const express = require('express');
const router = express.Router();
const { InterViewModel } = require('../models/InterviewRequest');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const data = await InterViewModel.find().sort({ createdAt: -1 });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, jobTitle } = req.body;
    const newRequest = new InterViewModel({ name, email, jobTitle });
    const saved = await newRequest.save();

    if (req.io) req.io.to('recruiters').emit('new-application', saved);

    res.status(201).json({ message: 'Request submitted', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit request' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updated = await InterViewModel.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted', acceptedAt: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });

    if (req.io) req.io.to('recruiters').emit('requestAccepted', updated);

    res.json({ message: 'Accepted', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting request' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await InterViewModel.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });

    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching request' });
  }
});

module.exports = router;
