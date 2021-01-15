import { Request, Response, NextFunction } from "express";
import { User } from "../entities/UserEntity";
import { NotAuthorizedError } from "../errors/not-authorized";
import { PasswordHash } from "../services/password-hash";
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userCredentials = req?.headers?.authorization;
  if (!userCredentials) {
    throw new NotAuthorizedError();
  }
  userCredentials = userCredentials.toString().split(" ")[1];
  const buf = new Buffer(userCredentials, "base64");
  userCredentials = buf.toString();
  const [name, password] = userCredentials.split(":");
  const user = await User.findOne({ name });
  // check if password match
  if (!user || !(await PasswordHash.compare(user.password, password))) {
    throw new NotAuthorizedError();
  }
  req.body.userId = user.id;
  next();
};
