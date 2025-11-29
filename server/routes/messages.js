import express from "express";
import Message from "../models/message.js";
import sequenceGenerator from "./sequenceGenerator.js";

const router = express.Router();

// GET all messages with sender populated
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().populate("sender");
    res.status(200).json({
      message: "Messages fetched successfully!",
      messages: messages,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
});

// POST a new message
router.post("/", async (req, res) => {
  try {
    const nextId = sequenceGenerator.nextId("messages");
    const message = new Message({
      id: nextId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender,
    });

    const created = await message.save();
    res.status(201).json({ message: "Message added successfully", messageObj: created });
  } catch (error) {
    res.status(500).json({ message: "Creating message failed", error });
  }
});

// PUT update a message
router.put("/:id", async (req, res) => {
  try {
    const updated = await Message.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message updated", messageObj: updated });
  } catch (error) {
    res.status(500).json({ message: "Updating message failed", error });
  }
});

// DELETE a message
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Message.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deleting message failed", error });
  }
});

export default router;
