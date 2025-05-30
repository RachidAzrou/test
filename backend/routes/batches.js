const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Batch.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const batch = await Batch.findByPk(req.params.id);
  batch ? res.json(batch) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Batch.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Batch.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Batch.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;