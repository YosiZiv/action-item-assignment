import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { userRouter } from "./routes/userRoute";
import { workoutRouter } from "./routes/workoutRoute";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
const app = express();
app.use(json());

app.use(userRouter);
app.use(workoutRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
