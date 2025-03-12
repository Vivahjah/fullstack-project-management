import mongoose, {Document, Schema} from "mongoose";
import { TaskPriorityEnum, TaskPriorityEnumType, TaskStatusEnum, TaskStatusEnumType } from "../enums/task.enum";
import { generateTaskCode } from "../utils/uuid";


export interface TaskDocument extends Document {
    taskCode: string;
    title : string;
    description: string | null;
    status: TaskStatusEnumType;
    priority: TaskPriorityEnumType;
    dueDate: Date | null;
    project: mongoose.Types.ObjectId;
    workSpace : mongoose.Types.ObjectId;
    assignedTo: mongoose.Types.ObjectId | null;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const taskSchema = new Schema<TaskDocument>({
    taskCode: {
        type: String,
        trim: true,
        unique: true,
        default : generateTaskCode
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(TaskStatusEnum),
        default: TaskStatusEnum.TODO
    },
    priority: {
        type: String,
        required: true,
        enum: Object.values(TaskPriorityEnum),
        default: TaskPriorityEnum.LOW
    },
    dueDate: {
        type: Date,
        required: false,
        default: null
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    workSpace: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});


const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);
export default TaskModel;