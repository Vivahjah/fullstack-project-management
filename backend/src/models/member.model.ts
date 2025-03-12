
import mongoose, { Document, Schema } from 'mongoose';
import { RoleDocument } from './roles-permission.model';



export interface MemberDocument extends Document {
    workspaceId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    role : RoleDocument;
    joinAt: Date;
   
}

const memberSchema = new Schema<MemberDocument>({
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    joinAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const MemberModel = mongoose.model<MemberDocument>("Member", memberSchema);
export default MemberModel;