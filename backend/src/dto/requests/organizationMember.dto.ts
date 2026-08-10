export enum RoleTypes {
  TeamLead = 'TEAM LEAD',
  developer = 'DEVELOPER',
  viewer = 'VIEWER',
}


export interface organizationMemberInputDto {
    email: string,
    role: RoleTypes,
}