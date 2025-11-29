import Sequence from "../models/sequence.js";

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

class SequenceGenerator {
  constructor() {
    Sequence.findOne()
      .then((sequence) => {
        if (!sequence) {
          console.error("❌ No sequence document found in MongoDB.");
          return;
        }
        sequenceId = sequence._id;
        maxDocumentId = sequence.maxDocumentId;
        maxMessageId = sequence.maxMessageId;
        maxContactId = sequence.maxContactId;
        console.log("✅ Sequence initialized:", { maxDocumentId, maxMessageId, maxContactId });
      })
      .catch((err) => console.error("❌ Error initializing sequence generator:", err));
  }

  nextId(collectionType) {
    if (!sequenceId) {
      console.error("⚠ Sequence not initialized yet.");
      return null;
    }

    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case "documents":
        maxDocumentId++;
        updateObject = { maxDocumentId };
        nextId = maxDocumentId;
        break;
      case "messages":
        maxMessageId++;
        updateObject = { maxMessageId };
        nextId = maxMessageId;
        break;
      case "contacts":
        maxContactId++;
        updateObject = { maxContactId };
        nextId = maxContactId;
        break;
      default:
        return -1;
    }

    Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
      .then(() => {
        console.log(`✅ Updated ${collectionType} sequence to ${nextId}`);
      })
      .catch((err) => console.error("❌ nextId error:", err));

    return nextId;
  }
}

const sequenceGenerator = new SequenceGenerator();
export default sequenceGenerator;
