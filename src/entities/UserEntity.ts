import mongoose from "mongoose";
import { PasswordHash } from "../services/password-hash";
// An interface that describe the properties
// that are required to create a new User

interface UserAttrs {
  name: string;
  password: string;
  age: string;
  city: string;
}

// An interface that describe the properties
// that a user model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describe the properties
// that a user document has

interface UserDoc extends mongoose.Document {
  name: string;
  password: string;
  age: string;
  city: string;
}
const userSchema = new mongoose.Schema(
  {
    name: {
      index: true,
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    city: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordHash.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
