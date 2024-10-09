const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected !!");
    }
    catch (error) {
        console.log("MongoDB connection error ", error);
        process.exit(1);
    }
}

exports.module = connectDB;