import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      maxLength: 1000,
    },
    confirmPassword: {
      type: String,
      required: [true, "Passwords must match"],
      select: false,
      minLength: 8,
      maxLength: 1000,

      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords don't match",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
