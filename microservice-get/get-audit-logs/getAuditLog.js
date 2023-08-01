import { auditModel } from "./audit.model.js";
import { mongodbConnection } from "./mongodb.js";
import { mongodbDisconnect } from "./mongodb.js";

export const getAuditChanges = async (event) => {
  try {
    const eventquery = event.queryStringParameters;
    const filter = {};

    if (eventquery?.user_id) filter.user_id = eventquery.user_id;
    //fetch using date
    if (eventquery?.changedDate) {
      const changedDate = new Date(eventquery.changedDate.split("T")[0]);
      const startDate = new Date(changedDate);
      const endDate = new Date(changedDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.changedDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    //fetch using date range
    if (eventquery?.dateRange) {
      const [startDateString, endDateString] =
        eventquery.dateRange.split(" to ");
      const startDate = new Date(startDateString.split("T")[0]);
      const endDate = new Date(endDateString.split("T")[0]);
      endDate.setDate(endDate.getDate() + 1);
      filter.changedDate = { $gte: startDate, $lte: endDate };
    }

    await mongodbConnection();
    const auditLogs = await auditModel.find(filter);
    await mongodbDisconnect();

    if (auditLogs.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Data retrieved",
          data: auditLogs,
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Data not found with these input data's",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while processing the request.",
      }),
    };
  }
};
