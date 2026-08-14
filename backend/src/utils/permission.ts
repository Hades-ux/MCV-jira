import { RoleTypes } from '../models/organizationMember.model.js';

export const rolePermission: Record<RoleTypes, string[]> = {
  [RoleTypes.owner]: [
    'member:create',
    'member:update',
    'member:delete',
    'organization:update',
    'organization:delete',
  ],

  [RoleTypes.TeamLead]: ['member:create'],
  [RoleTypes.developer]: [],
  [RoleTypes.viewer]: [],
};

export const hasPermission = (role: RoleTypes, permission: string) => {
  return rolePermission[role]?.includes(permission) ?? false;
};