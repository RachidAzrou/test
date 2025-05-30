const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Exam.findAll()));
router.post('/', authenticateToken, requireRole('teacher'), async (req, res) => res.json(await Exam.create(req.body)));
router.put('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Exam.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Exam.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;