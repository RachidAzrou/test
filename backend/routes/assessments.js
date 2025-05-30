const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Assessment.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const assessment = await Assessment.findByPk(req.params.id);
  assessment ? res.json(assessment) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('teacher'), async (req, res) => res.json(await Assessment.create(req.body)));
router.put('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Assessment.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('teacher'), async (req, res) => {
  await Assessment.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;