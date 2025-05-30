const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Gradebook = require('../models/Gradebook');
const Fee = require('../models/Fee');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/attendance/:studentId', authenticateToken, async (req, res) => {
  const records = await Attendance.findAll({ where: { studentId: req.params.studentId } });
  res.json(records);
});

router.get('/grades/:studentId', authenticateToken, async (req, res) => {
  const grades = await Gradebook.findAll({ where: { studentId: req.params.studentId } });
  res.json(grades);
});

router.get('/fees/unpaid', authenticateToken, requireRole('admin'), async (req, res) => {
  const fees = await Fee.findAll({ where: { status: 'Unpaid' } });
  res.json(fees);
});

router.get('/promotion/:batchId', authenticateToken, async (req, res) => {
  const gradebook = await Gradebook.findAll({ where: {}, raw: true });
  res.json(gradebook);
});

module.exports = router;