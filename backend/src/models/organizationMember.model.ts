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
        ref:'Organiztion',
        required:true,
    },

    isDeleted: {
        type: Boolean,
        default:false,
    },

    role:{
        type: String,
        enum: Object.values(RoleTypes),
        default: RoleTypes.developer
    },

    invitedBy:{}

}, { timestamps: true });

export default mongoose.model('organizationMember', organizationMemberSchema);
