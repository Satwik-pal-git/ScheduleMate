const mongoose = require("mongoose");

const db = "mongodb+srv://task_growthpal:MzchtM1QQkRcsmFB@cluster0.lw2jp.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected...");
    } catch (error) {
        console.log("Failed to connect the database! ");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;