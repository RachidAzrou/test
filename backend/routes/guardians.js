const express = require('express');
const router = express.Router();
const Guardian = require('../models/Guardian');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Guardian.findAll()));
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Guardian.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Guardian.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Guardian.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;