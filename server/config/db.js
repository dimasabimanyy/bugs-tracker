const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (e) {
        console.log('Error connecting to mongo', e);
    }

}

module.exports = connectDb;