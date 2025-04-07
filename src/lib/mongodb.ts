import mongoose from "mongoose";

const conn = {
  isConnected: 0,
};

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("Error: add the mongo URI to the .env file");
    } else {
      if (conn.isConnected) return;

      const db = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB connected:${db.connection.host}`);
      conn.isConnected = db.connections[0].readyState;
    }
  } catch (error) {
    if (error instanceof mongoose.Error) {
      console.error("Error: ${error.message}");
      process.exit(1);
    }
  }
};
export default connectDB;
