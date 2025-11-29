import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" }
});

export default mongoose.model("Message", messageSchema);
