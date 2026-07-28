import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const instant = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    console.log("DB connection confirm, Host: "+`${instant.connection.host}`);
  } catch (error: any) {
    console.log(`Error in DB connection: ` + error.message);
    process.exit(1);
  }
};

export default connectDB;
