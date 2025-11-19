import express from "express";

const router = express.Router();

// Placeholder CRUD endpoints
router.get("/", (req, res) => {
  res.json({ message: "GET all contacts" });
});

router.post("/", (req, res) => {
  res.json({ message: "POST new contact", data: req.body });
});

router.put("/:id", (req, res) => {
  res.json({ message: `PUT update contact ${req.params.id}`, data: req.body });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE contact ${req.params.id}` });
});

export default router;
