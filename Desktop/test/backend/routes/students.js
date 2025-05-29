const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// CRUD endpoints for students
router.get('/', async (req, res) => res.json(await Student.findAll()));
router.post('/', async (req, res) => res.json(await Student.create(req.body)));
router.put('/:id', async (req, res) => {
    await Student.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
});
router.delete('/:id', async (req, res) => {
    await Student.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
});

module.exports = router;