import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Alle cijfers ophalen
router.get("/", (req, res) => {
  res.json(db.grades);
});

// Een cijfer toevoegen
router.post("/", (req, res) => {
  const nieuw = { id: db.grades.length + 1, ...req.body };
  db.grades.push(nieuw);
  res.status(201).json(nieuw);
});

export default router;