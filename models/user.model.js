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
            match: [/\S+@\S+\.\S+/, "Email is invalid"], 
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
        bio: {
            type: String,
            trim: true,
            maxlength: [500, "Bio cannot exceed 500 characters"], 
        },
        photo: {
            type: String, 
            trim: true,
        },
        skills: {
            type: [String], 
            default: [], 
            validate: {
                validator: (skills) => skills.every((skill) => typeof skill === "string"),
                message: "All skills must be strings",
            },
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 });

const User = model("User", userSchema);

export default User;
