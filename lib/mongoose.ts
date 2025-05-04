import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGODBURL as string;

// if URL not present
if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URI environment variable");
}


// if present

let is_connected = false;

export const connectToDB = async()=>{
    if(is_connected) return;

    try {
        await mongoose.connect(MONGODB_URL)
        is_connected = true;
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error(`MongoDB connection error :`,err);
        throw err;
    }
}
