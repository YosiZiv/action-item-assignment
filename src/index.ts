require("dotenv").config();
import mongoose from "mongoose";
import { app } from "./app";

(async () => {
  try {
    if (!process.env.MONGO_USER || !process.env.MONGO_PASSWORD) {
      throw new Error("MONGO CREDENTIALS must be defined");
    }
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yuwfs.mongodb.net/nodejs-example?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (err) {
    console.log(err);
  } finally {
    app.listen(3000, () => console.log("listening on port 3000!!!!!!"));
  }
})();
