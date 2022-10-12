import mongoose from 'mongoose'

const connectMongo = async () => {
    if(mongoose.connection.readyState) return
    else  return mongoose.connect(process.env.MONGODB_URI!)
}

export default connectMongo