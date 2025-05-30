const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Teacher.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const teacher = await Teacher.findByPk(req.params.id);
  teacher ? res.json(teacher) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Teacher.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Teacher.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Teacher.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;