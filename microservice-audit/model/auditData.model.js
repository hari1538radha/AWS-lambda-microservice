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
export const auditDataSchema = new mongoose.Schema(
  {
    zoneCode: {
      type: String,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientKey: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
    module: {
      type: String,
    },
    updatedBy: {
      type: String,
      required: true,
    },
    changes: {
      type: [Object],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const auditDataModel = new mongoose.model(
  "audit-model",
  auditDataSchema
);

// Create the audit model using the defined schema
export const auditModel = new mongoose.model("audit", auditSchema);
