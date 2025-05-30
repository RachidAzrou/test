const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');
const { authenticateToken, requireRole } = require('../middleware/auth');

// E-mail notificatie (admin)
router.post('/email', authenticateToken, requireRole('admin'), async (req, res) => {
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "your@email.com",
      pass: "yourpassword"
    }
  });

  try {
    await transporter.sendMail({
      from: '"School Admin" <your@email.com>',
      to,
      subject,
      text
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Interne notificaties (inbox)
router.get('/inbox/:userId', authenticateToken, async (req, res) => {
  const notes = await Notification.findAll({ where: { userId: req.params.userId } });
  res.json(notes);
});

router.post('/inbox', authenticateToken, async (req, res) => {
  const note = await Notification.create(req.body); // { userId, message }
  res.json(note);
});

router.post('/inbox/read/:id', authenticateToken, async (req, res) => {
  await Notification.update({ read: true }, { where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;