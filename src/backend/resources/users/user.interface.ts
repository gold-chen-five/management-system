import { Document } from 'mongoose'

export interface UserInterface extends Document {
    email: string;
    name: string;
    password: string;
    permission: string;

    isValidPassword(password: string): Promise<Error | boolean>
}

export interface SigninInterface extends Document {
    email: string;
    password: string;
}

export interface GetPermissionInterface extends Document {
    id: string
}

export interface GetAllUserInterface extends Document {
    email: string;
    name: string;
    permission: string;
}

export interface GetUserInterface{
    id: string;
}

