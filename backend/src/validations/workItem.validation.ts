import { body } from "express-validator";
import { WorkItemType, PriorityType } from "../models/workItem.model.js";

export const createWorkItemValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("workType")
    .notEmpty()
    .withMessage("Work type is required")
    .isIn(Object.values(WorkItemType))
    .withMessage("Invalid work type"),

  body("priority")
    .optional()
    .isIn(Object.values(PriorityType))
    .withMessage("Invalid priority"),

  body("assignedTo")
    .notEmpty()
    .withMessage("Assigned user is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
];