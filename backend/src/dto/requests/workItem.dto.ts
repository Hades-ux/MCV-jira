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

export interface WorkItemDto {
title: string,
descripton: string,
workType:WorkItemType,
priority: PriorityType,
assignedTo:string
}