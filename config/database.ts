import mongoose from "mongoose";

const connectedDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb+srv://ibodullaevabror14:9xdFjg6xsBsw2c9Z@cluster0.nvhxilp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
      throw error;
    } else {
      console.error("Unknown error:", error);
      throw new Error("Unknown error occurred");
    }
  }
};

export default connectedDB;
