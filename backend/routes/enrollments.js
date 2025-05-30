const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Enrollment.findAll()));
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Enrollment.create(req.body)));
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Enrollment.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;