import User from "../models/user.model.js";
import Permission from "../models/permisson.model.js";
import AppError from "../utils/error.utils.js";

export const AddUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return next(new AppError("Name and email are required.", 400));
        }

        // Create User
        const user = await User.create({
            name,
            email,
        });

        if (!user) {
            return next(new AppError("Error creating user.", 500));
        }

       
        const permission = await Permission.create({
            userId: user._id,
            userName : user.name
        });

        if (!permission) {
            return next(new AppError("Error creating permissions.", 500));
        }

        res.status(200).json({
            message: "User added successfully",
            user,
            permission,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export const GetUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return next(new AppError("User not found.", 404));
        }

        const permission = await Permission.findOne({ userId: id });
        if (!permission) {
            return next(new AppError("Permissions not found for this user.", 404));
        }

        res.status(200).json({
            message: "User fetched successfully",
            user,
            permission,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
export const EditUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, role, status, permissions } = req.body;

        // Find the user to ensure it exists
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("User not found.", 404));
        }

        // Update only the provided fields in the user document
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (status) user.status = status;

        await user.save();

        // Fetch existing permission record
        const permission = await Permission.findOne({ userId: id });

        if (!permission) {
            return next(new AppError("Permissions for this user not found.", 404));
        }

        // Update roles only if provided
        if (role) {
            permission.roles = {
                user: role === "user",
                admin: role === "admin",
                subadmin: role === "subadmin",
            };
        }

        // Update permissions if provided
        if (permissions) {
            permission.permissions = {
                ...permission.permissions,
                ...permissions, // Merge provided permissions with existing ones
            };
        }

        await permission.save();

        res.status(200).json({
            message: "User updated successfully",
            user,
            permission,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export const DeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return next(new AppError("User not found or delete failed.", 404));
        }

        await Permission.deleteOne({ userId: id });

        res.status(200).json({
            message: "User and permissions deleted successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
export const GetAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        const permissions = await Permission.find();

        const result = users.map(user => ({
            user,
            permission: permissions.find(perm => String(perm.userId) === String(user._id)),
        }));

        res.status(200).json({
            message: "Users fetched successfully",
            data: result,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
export const EditUserRole = async (req, res, next) => {
    try {
        const { id } = req.params; // User ID
        const { role } = req.body; // New role

        if (!role || !["user", "admin", "subadmin"].includes(role)) {
            return next(new AppError("Invalid role. Allowed values: user, admin, subadmin.", 400));
        }

        // Update user role
        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return next(new AppError("User not found.", 404));
        }

        // Update corresponding permission roles
        const permission = await Permission.findOneAndUpdate(
            { userId: id },
            {
                roles: {
                    user: role === "user",
                    admin: role === "admin",
                    subadmin: role === "subadmin",
                },
            },
            { new: true }
        );

        if (!permission) {
            return next(new AppError("Permission not found for the user.", 404));
        }

        res.status(200).json({
            message: "Role updated successfully",
            user,
            permission,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
export const EditUserPermission = async (req, res, next) => {
    try {
        const { id } = req.params; // User ID
        const { permissions } = req.body; // New permissions

        if (!permissions || typeof permissions !== "object") {
            return next(new AppError("Invalid permissions data.", 400));
        }

        // Update permissions
        const permission = await Permission.findOneAndUpdate(
            { userId: id },
            {
                permissions: {
                    ...permissions, // Merge new permissions with existing ones
                },
            },
            { new: true }
        );

        if (!permission) {
            return next(new AppError("Permission not found for the user.", 404));
        }

        res.status(200).json({
            message: "Permissions updated successfully",
            permission,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
