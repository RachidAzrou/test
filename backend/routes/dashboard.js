import express from "express";

const router = express.Router();

// Voorbeeldroute: Dashboard info (dummy data)
router.get("/", (req, res) => {
  res.json({
    message: "Dashboard endpoint werkt!",
    status: "ok"
  });
});

export default router;