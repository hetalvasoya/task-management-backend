const mongoose = require("mongoose");
const config = require('./config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGODB_URI);        
        console.log(`Database connected: ${conn.connection.name}`);
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;