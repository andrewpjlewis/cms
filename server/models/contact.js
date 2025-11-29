import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  imageUrl: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }]
});

export default mongoose.model("Contact", contactSchema);
