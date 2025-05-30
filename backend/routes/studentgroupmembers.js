const express = require('express');
const router = express.Router();
const StudentGroupMember = require('../models/StudentGroupMember');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/:groupId', authenticateToken, async (req, res) => {
  const members = await StudentGroupMember.findAll({ where: { studentGroupId: req.params.groupId } });
  res.json(members);
});
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => {
  const member = await StudentGroupMember.create(req.body); // { studentGroupId, studentId }
  res.json(member);
});
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  await StudentGroupMember.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;