import {Document, model, MongooseError, Schema} from 'mongoose';
import bcrypt from 'bcrypt'

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

UserSchema.pre('save', async function (next) {//CANNOT DO ARROW FUNCTION BECAUSE WE NEED TO USE THIS
    if (!this.isModified('password')) {
        next()
    }

    try {
        const hashedPassword= await bcrypt.hash(this.password, 10);
        this.password=hashedPassword
        
    } catch (error) {
        if (error instanceof MongooseError) {
            next(error)
        }
        throw error
    }
}) 
export const User= model<TUser>('User', UserSchema) //1st name of the model/table 2nd the schema structure of it