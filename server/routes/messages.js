import express from "express";

const router = express.Router();

// Placeholder CRUD endpoints
router.get("/", (req, res) => {
  res.json({ message: "GET all messages" });
});

router.post("/", (req, res) => {
  res.json({ message: "POST new message", data: req.body });
});

router.put("/:id", (req, res) => {
  res.json({ message: `PUT update message ${req.params.id}`, data: req.body });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE message ${req.params.id}` });
});

export default router;
