import mongoose from "mongoose";

class Mongo
{
    static async connect()
    {
        const MONGODB_URI = process.env.MONGODB_URI;
        
        if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

        await mongoose.connect(MONGODB_URI, {
            dbName: 'Academy',
            bufferCommands: false
        })

        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err)); 
    }
}

export default Mongo