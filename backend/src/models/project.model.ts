
import mongoose, { Document, Schema } from "mongoose";


export interface WorkspaceDocument extends Document {
    name: string;
    description: string | null;
    emoji: string;
    workspace: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const projectSchema = new Schema<WorkspaceDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        require : false,
    },
    emoji: {
        type: String,
        required: false,
        default: "🚀",
        trim: true
    },
    workspace: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const ProjectModel = mongoose.model<WorkspaceDocument>("Project", projectSchema);
export default ProjectModel; 




