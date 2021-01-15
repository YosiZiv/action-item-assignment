import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { createUser } from "../controllers/userController";
const router = express.Router();

router.post(
  "/api/users/",
  [
    body("name")
      .trim()
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("username must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 30 })
      .withMessage("Password must be between 6 - 30 char"),
    body("age")
      .isNumeric()
      .isLength({ min: 1, max: 120 })
      .withMessage("age must be between 1 - 120"),
    body("city")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("City must be between 6 - 30 char"),
  ],
  validateRequest,
  createUser
);
export { router as userRouter };
