import { Schema, model, models} from 'mongoose'

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    permission: {
        type: String, 
        enum: ['manager','user'],
        require: true
    }
})

const User = models.user || model('user',userSchema)
export default User