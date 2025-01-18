import mongoose from 'mongoose';

let connected = false;

const connectDb = async () => {
  mongoose.set('strictQuery', true);

  // If the db is already connected, don't connect again
  if (connected) {
    console.log('Connected to database already...');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }

}

export default connectDb;
