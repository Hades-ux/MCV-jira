import mongoose from 'mongoose';

export enum WorkItemType {
  ISSUE = 'ISSUE',
  ASSIGNMENT = 'ASSIGNMENT',
}

export enum PriorityType {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
  CRITICAL = 'CRITICAL',
}

export enum WorkItemStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
}

const workItemSchema = new mongoose.Schema(
  {
    workID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    workType: {
      type: String,
      required: true,
      enum: Object.values(WorkItemType),
    },

    priority: {
      type: String,
      required: true,
      enum: Object.values(PriorityType),
      default: PriorityType.NORMAL,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(WorkItemStatus),
      default: WorkItemStatus.TODO,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model('WorkItem', workItemSchema);
