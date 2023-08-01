import { auditModel } from "./audit.model.js";
import { mongodbConnection } from "./mongodb.js";
import { mongodbDisconnect } from "./mongodb.js";
// Lambda function to handle the event
export const hello = async (event) => {
  try {
    // Parse the event body to extract data
    const eventBody = JSON.parse(event.body);
    const { user_id, entity_id, entity, changedData, previousData } = eventBody;

    // Connect to MongoDB using the provided connection string
    await mongodbConnection();

    // Create a new auditModel instance with the provided data
    const newAuditChanges = new auditModel({
      user_id,
      entity_id,
      entity,
      changedData,
      previousData,
      changedDate: Date.now(),
    });

    // Save the new audit changes to the database
    const saveAuditChange = await newAuditChanges.save();
    await mongodbDisconnect();
    // Return the response with the saved data and MongoDB connection status
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data saved in the database",
        data: saveAuditChange
      }),
    };
  } catch (error) {
    // Return the error in case of any exception
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
