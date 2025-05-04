import mongoose, {Schema,Document} from "mongoose"


export interface IUser extends Document{
    email:string
    username:string
    password:string
}



const UserSchema = new Schema<IUser>({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})


export const User = mongoose.models.User || mongoose.model<IUser>('User',UserSchema);
// checks if a model named User is already registered 
// If it exists, it uses that.
// If not, it creates a new model from the schema.


