import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("MongoDB connected successfully 🥭");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default db;
