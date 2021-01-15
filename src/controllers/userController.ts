import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../entities/UserEntity";

const createUser = async (req: Request, res: Response) => {
  const { name, password, age, city } = req.body;
  let user = await User.findOne({ name });
  if (user) {
    throw new BadRequestError("Name in use");
  }
  user = User.build({ name, password, age, city });
  await user.save();
  return res.status(201).send(user);
};
export { createUser };
