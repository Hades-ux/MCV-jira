import mongoose from 'mongoose';

export enum RoleTypes {
  owner = 'OWNER',
  TeamLead = 'TEAM LEAD',
  developer = 'DEVELOPER',
  viewer = 'VIEWER',
}

const organizationMemberSchema = new mongoose.Schema({

    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    organizationId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization',
        required:true,
    },

    isDeleted: {
        type: Boolean,
        default:false,
    },

    role:{
        type: String,
        enum: Object.values(RoleTypes),
        default: RoleTypes.viewer
    },

    invitedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default: null,
    }

}, { timestamps: true });

export default mongoose.model('organizationMember', organizationMemberSchema);
