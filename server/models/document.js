import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  children: [{ type: Object }],
});

const Document = mongoose.model("Document", documentSchema);
export default Document;
