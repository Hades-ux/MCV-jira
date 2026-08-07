import { WorkItemDto } from "../dto/requests/workItem.dto.js";
import workItem from "../models/workItem.model.js"

export const createWorkItemService = async(dto: WorkItemDto) =>{
    const response = await workItem.create(dto)
    return response;
}