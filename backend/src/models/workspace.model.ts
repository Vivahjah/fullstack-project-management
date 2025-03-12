import mongoose, {Document, Schema} from "mongoose";
import { generateInviteCode } from "../utils/uuid";


export interface WorkspaceDocument extends Document {
    name: string;
    description: string;
    owner: mongoose.Types.ObjectId;
    inviteCode : string;
    createdAt: Date;
    updatedAt: Date;
}



const workspaceSchema = new Schema<WorkspaceDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    inviteCode: {
        type: String,
        required: true,
        default : generateInviteCode,
        unique: true
    }
}, {timestamps: true});

//want to reset the invite code
 workspaceSchema.methods.resetInviteCode = function() {
    this.inviteCode = generateInviteCode();
 }

 const WorkspaceModel = mongoose.model<WorkspaceDocument>("Workspace", workspaceSchema);

export default WorkspaceModel;
