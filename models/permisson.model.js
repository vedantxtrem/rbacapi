import { Schema, model, Types } from "mongoose";

const permissionSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        userName : {
            type : String
        },
        roles: {
            user: {
                type: Boolean,
                default: true, 
            },
            admin: {
                type: Boolean,
                default: false,
            },
            subadmin: {
                type: Boolean,
                default: false,
            },
        },
        permissions: {
            storeManagement: {
                type: Boolean,
                default: false,
            },
            blogManagement: {
                type: Boolean,
                default: false,
            },
            walletManagement: {
                type: Boolean,
                default: false,
            },
        },
    },
    { timestamps: true }
);

permissionSchema.index({ userId: 1 });

const Permission = model("Permission", permissionSchema);

export default Permission;
