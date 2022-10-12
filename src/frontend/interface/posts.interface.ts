import { Document } from 'mongoose'
export interface ApplicationListInterface extends Document{
    _id: string;
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
    approval: boolean;
    returned: boolean;
}