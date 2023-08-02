import mongoose from "mongoose";

//connecting mongodb
export const mongodbConnection = async () => {
  await mongoose
    .connect(
      `mongodb+srv://Hari:${process.env.MONGOPASS}@cluster0.6vwzlhz.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((res) => {
      console.log("mongodb connection made");
    })
    .catch((error) => {
      return error;
    });
};

// disconnecting mongodb
export const mongodbDisconnect = async () => {
  if (mongoose.connection.readyState == 1) {
    await mongoose.connection.close();
    console.log("mongodb connection disconnected after the query execution");
  }
};
