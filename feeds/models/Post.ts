import mongoose,{Schema,Document,model} from "mongoose";


export interface IPost extends Document{
    title:String
    content:String
    tags?:String[]
    author:mongoose.Types.ObjectId
    is_published: boolean;
    is_private: boolean;
    createdAt: Date;
    updatedAt: Date;
}


const postSchema = new Schema<IPost>(
    {
        title:{type:String,required:true},
        content:{type:String,required:true},
        tags: [{ type: String }],
        author:{type:Schema.Types.ObjectId,ref:"User",required:true},
        is_published:{type:Boolean,default:false},
        is_private:{type:Boolean,default:false},
    },
    {
        timestamps:true // adds createdAt and updatedAt
    }
)


export const Post = mongoose.models.Post || model<IPost>('Post',postSchema);