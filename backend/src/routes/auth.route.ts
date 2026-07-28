import express from "express";
import { registrationValidation } from "../validations/auth.validation.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { registerUserController } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/register", registrationValidation, validationMiddleware, registerUserController)

export default router;