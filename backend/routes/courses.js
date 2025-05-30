const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Course.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  course ? res.json(course) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Course.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Course.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Course.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;