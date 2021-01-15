import express from "express";
import { body, validationResult } from "express-validator";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkout,
} from "../controllers/workoutController";
const router = express.Router();

router.post(
  "/api/workout/",
  requireAuth,
  [
    body("type").trim().isString().withMessage("type must be valid"),
    body("duration")
      .isNumeric()
      .isLength({ min: 1, max: 1000 })
      .withMessage("duration must be between 1 - 1000 minutes"),
    body("location.lat")
      .trim()
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("location.lat must be valid string"),
    body("location.lon")
      .trim()
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("location.lon must be valid string"),
  ],
  validateRequest,
  createWorkout
);
router.put(
  "/api/workout/",
  requireAuth,
  [
    body("type").trim().isString().withMessage("type must be valid"),
    body("duration")
      .isNumeric()
      .isLength({ min: 1, max: 1000 })
      .withMessage("duration must be between 1 - 1000 minutes"),
    body("location.lat")
      .trim()
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("location.lat must be valid string"),
    body("location.lon")
      .trim()
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("location.lon must be valid string"),
  ],
  validateRequest,
  updateWorkout
);
router.delete(
  "/api/workout/",
  requireAuth,
  [body("workoutId").trim().isString().withMessage("type must be valid")],
  validateRequest,
  deleteWorkout
);
router.get(
  "/api/workout/",
  requireAuth,
  [
    body("workoutId")
      .trim()
      .isString()
      .withMessage("workout id must be supplied"),
  ],
  validateRequest,
  getWorkout
);
export { router as workoutRouter };
