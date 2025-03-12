export const TaskStatusEnum = {
    BACKLOG: "BACKLOG",
    IN_PROGRESS: "IN_PROGRESS",
    IN_REVIEW: "IN_REVIEW",
    DONE: "DONE",
    TODO : "TODO" 
} as const;


export const TaskPriorityEnum = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    
} as const;




export type TaskStatusEnumType = keyof typeof TaskStatusEnum
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum