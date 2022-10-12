import { Document } from 'mongoose'

export interface ApplicationListInterface extends Document{
    user_id:  string;
    line: string;
    item: string;
    specification: string;
    project: string;
    serialNum: string;
    borrowDate: string;
    applicant: string;
    bring: string;
    returnBack: string;
    returnDate: string;
    otherReason: string;
}

export interface GetApplicationList extends Document {
    userName: string;
    approval: string;
}

export interface ApplicationListId  extends Document{
    _id: string
}