import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type UserSchemaType = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new mongoose.Schema<UserSchemaType>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: { type: String, required: [true, "Name is required"] },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method("matchPassword", async function (enterePassword: string) {
  try {
    return await bcrypt.compare(enterePassword, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);

    return false;
  }
});

const Users =
  mongoose.models.Users || mongoose.model<UserSchemaType>("Users", userSchema);
export default Users;
