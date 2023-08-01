import mongoose from "mongoose";

// Define the schema for the audit data
export const auditSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  entity_id: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    required: true,
  },
  changedData: {
    type: Object,
    required: true,
  },
  previousData: {
    type: Object,
    required: true,
  },
  changedDate: {
    type: Date,
    default: Date.now(),
  },
});

// Create the audit model using the defined schema
export const auditModel = new mongoose.model("audit", auditSchema);