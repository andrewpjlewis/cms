import express from "express";

const router = express.Router();

// Placeholder CRUD endpoints
router.get("/", (req, res) => {
  res.json({ message: "GET all documents" });
});

router.post("/", (req, res) => {
  res.json({ message: "POST new document", data: req.body });
});

router.put("/:id", (req, res) => {
  res.json({ message: `PUT update document ${req.params.id}`, data: req.body });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE document ${req.params.id}` });
});

export default router;
