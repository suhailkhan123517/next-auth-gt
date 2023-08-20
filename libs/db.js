import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect to Mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb: ", error);
  }
};
