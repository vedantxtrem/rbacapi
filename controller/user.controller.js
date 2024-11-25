import User from "../models/user.model.js";
import Permission from "../models/permisson.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary'

export const AddUser = async (req, res, next) => {
    try {
        const { name, email, bio, photo, skills } = req.body;

        if (!name || !email) {
            return next(new AppError("Name and email are required.", 400));
        }
        const user = await User.create({
            name,
            email,
            bio,
            photo,
            skills,
        });

        if (!user) {
            return next(new AppError("Error creating user.", 500));
        }
        const permission = await Permission.create({
            userId: user._id,
            userName: user.name,
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
        const { name, email, role, status, bio, photo, skills, permissions } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("User not found.", 404));
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (status) user.status = status;
        if (bio) user.bio = bio;
        if (photo) user.photo = photo;
        if (skills) user.skills = skills;

        await user.save();

        const permission = await Permission.findOne({ userId: id });

        if (!permission) {
            return next(new AppError("Permissions for this user not found.", 404));
        }

        if (role) {
            permission.roles = {
                user: role === "user",
                admin: role === "admin",
                subadmin: role === "subadmin",
            };
        }

        if (permissions) {
            permission.permissions = {
                ...permission.permissions,
                ...permissions, 
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
  
      const result = users.map((user) => {
        const userPermissions = permissions.find(
          (perm) => String(perm.userId) === String(user._id)
        );
  
        return {
          user,
          permission: userPermissions || null, 
        };
      });
  
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

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return next(new AppError("User not found.", 404));
        }

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
        const { id } = req.params; 
        const { permissions } = req.body; 

        if (!permissions || typeof permissions !== "object") {
            return next(new AppError("Invalid permissions data.", 400));
        }

        const permission = await Permission.findOneAndUpdate(
            { userId: id },
            {
                permissions: {
                    ...permissions, 
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

export const uploadImage = async (req, res, next) => {
    try {
      const { image } = req.body; // Expect the image to be sent in the `image` field
  
      if (!image) {
        return next(new AppError("No image provided", 400)); // Optional error handler
      }
  
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "rbac", // Optional: Specify a folder in Cloudinary
      });
  
      res.status(200).json({
        message: "Image uploaded successfully",
        url: result.secure_url, // Cloudinary URL of the uploaded image
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return next(new AppError("Image upload failed", 500)); // Optional error handler
    }
};
  