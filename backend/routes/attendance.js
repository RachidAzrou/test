const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Attendance.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const att = await Attendance.findByPk(req.params.id);
  att ? res.json(att) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('teacher'), async (req, res) => res.json(await Attendance.create(req.body)));
router.put('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Attendance.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Attendance.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;