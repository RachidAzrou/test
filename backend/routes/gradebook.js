const express = require('express');
const router = express.Router();
const Gradebook = require('../models/Gradebook');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Gradebook.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const grade = await Gradebook.findByPk(req.params.id);
  grade ? res.json(grade) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('teacher'), async (req, res) => res.json(await Gradebook.create(req.body)));
router.put('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Gradebook.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Gradebook.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;