const express = require('express');
const router = express.Router();
const StudentGroup = require('../models/StudentGroup');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await StudentGroup.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const group = await StudentGroup.findByPk(req.params.id);
  group ? res.json(group) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await StudentGroup.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await StudentGroup.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await StudentGroup.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;