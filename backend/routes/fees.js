const express = require('express');
const router = express.Router();
const Fee = require('../models/Fee');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Fee.findAll()));
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Fee.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Fee.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Fee.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;