import mongoose from "mongoose";

const mongodbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGODB CONNECTION SUCCESSFUL");
  } catch {
    console.log("MONGODB CONNECTION  FAILED");
  }
};

export default mongodbConnect;
