import { auditModel } from "../model/auditData.model.js";
import { mongodbConnection } from "../utils/mongoConnections.js";
import { mongodbDisconnect } from "../utils/mongoConnections.js";

export const getAuditData = async (event) => {
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
      console.log(endDateString);
      const startDate = new Date(startDateString.split("T")[0]);
      filter.changedDate = endDateString
        ? {
            $gte: startDate,
            $lte: new Date(endDateString.split("T")[0]).getDate() + 1,
          }
        : { $eq: startDate };
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
