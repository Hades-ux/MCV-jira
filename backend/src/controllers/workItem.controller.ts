import asyncHandler from '../utils/asyncHandler.js';
import { WorkItemDto } from '../dto/requests/workItem.dto.js';
import { createWorkItemService } from '../services/workItem.service.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createWorkItemcontroller = asyncHandler(async (req, res) => {
  const dto: WorkItemDto = req.body;
  const response = await createWorkItemService(dto);
  return res.status(201).json(new ApiResponse('Item created successfully', response));
});
