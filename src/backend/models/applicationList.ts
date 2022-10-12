import { Schema, model, models,Types} from 'mongoose'

const applicationListSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        require: true
    },
    line: {
        type: String,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    specification: {
        type: String,
        require: true
    },
    project: {
        type: String, 
        require: true
    },
    serialNum: {
        type: String,
        require: true
    },
    borrowDate: {
        type: Date,
        require: true
    },
    applicant: {
        type: String,
        require: true
    },
    bring: {
        type: String,
        require: true,
        enum: ["館內領用","館外攜出"]
    },
    returnBack: {
        type: String,
        require: true,
        enum: ["歸還","不歸還(列入個人)","不歸還(列入專案)","其他"]
    },
    returnDate: Date,
    otherReason: String,
    approval: {
        type: Boolean,
        require: true
    },
    returned: {
        type: Boolean,
        require: true
    },
})

const ApplicationList = models.applicationList || model('applicationList',applicationListSchema)
export default ApplicationList