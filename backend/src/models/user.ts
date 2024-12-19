import {Document, model, Schema} from 'mongoose';

type TUser= Document & {//Document _generate _id from mongoose
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
} 

const UserSchema= new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true//removes empty spaces
    },
    password: {
        type: String,
        required: true,
        select: false//we do not need-for security
    }
},
{
    timestamps: true
})

export const User= model<TUser>('User', UserSchema) //1st name of the model/table 2nd the schema structure of it