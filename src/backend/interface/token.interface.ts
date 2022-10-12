import { Schema } from "mongoose"

interface Token extends Object {
    id: Schema.Types.ObjectId,
    name: String,
    expiresIn: number
}

export default Token