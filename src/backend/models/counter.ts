import { Schema, model, models} from 'mongoose'

const counterSchema = new Schema({
   id: String,
   seq: Number
})

const Counter = models.counter || model('counter',counterSchema)
export default Counter