import express from "express";
import Contact from "../models/contact.js";
import sequenceGenerator from "./sequenceGenerator.js";

const router = express.Router();

// GET all contacts with populated groups
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().populate("group");
    res.status(200).json({
      message: "Contacts fetched successfully!",
      contacts: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
});

// POST a new contact
router.post("/", async (req, res) => {
  try {
    const nextId = sequenceGenerator.nextId("contacts");
    const contact = new Contact({
      id: nextId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group || [],
    });

    const created = await contact.save();
    res.status(201).json({ message: "Contact added successfully", contact: created });
  } catch (error) {
    res.status(500).json({ message: "Creating contact failed", error });
  }
});

// PUT update a contact
router.put("/:id", async (req, res) => {
  try {
    const updated = await Contact.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact updated", contact: updated });
  } catch (error) {
    res.status(500).json({ message: "Updating contact failed", error });
  }
});

// DELETE a contact
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deleting contact failed", error });
  }
});

export default router;
