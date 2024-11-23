import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Email is invalid"], // Email validation regex
        },
        role: {
            type: String,
            enum: ["user", "admin", "subadmin"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 });

const User = model("User", userSchema);

export default User;
