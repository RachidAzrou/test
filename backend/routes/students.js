const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => res.json(await Student.findAll()));
router.get('/:id', authenticateToken, async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  student ? res.json(student) : res.status(404).json({ error: 'Not found' });
});
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => res.json(await Student.create(req.body)));
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Student.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await Student.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;