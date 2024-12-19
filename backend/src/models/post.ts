import { Document, Schema, Types } from "mongoose";

type TComment= Document & {
    content: string,
    author: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}
const commentSchema= new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',//we ref to 'User' that is the table/model name
        required: true
     
    }
},
{
    timestamps: true
})

const postSchema= new Schema({
    title: {
        type: String,
        required: true, 
        trim: true
    },
    content: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',//we ref to 'User' that is the table/model name
        required: true
     
    }
})