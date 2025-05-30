const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Program.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const program = await Program.findByPk(req.params.id);
  program ? res.json(program) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Program.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Program.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Program.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;