import express from "express";
import Document from "../models/document.js";
import sequenceGenerator from "./sequenceGenerator.js";

const router = express.Router();

// GET all documents
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json({
      message: "Documents fetched successfully!",
      documents: documents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
});

// POST a new document
router.post("/", async (req, res) => {
  try {
    const nextId = sequenceGenerator.nextId("documents");
    const document = new Document({
      id: nextId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      children: req.body.children || [],
    });

    const created = await document.save();
    res.status(201).json({ message: "Document added successfully", document: created });
  } catch (error) {
    res.status(500).json({ message: "Creating document failed", error });
  }
});

// PUT update a document
router.put("/:id", async (req, res) => {
  try {
    const updated = await Document.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ message: "Document updated", document: updated });
  } catch (error) {
    res.status(500).json({ message: "Updating document failed", error });
  }
});

// DELETE a document
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Document.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deleting document failed", error });
  }
});

export default router;
