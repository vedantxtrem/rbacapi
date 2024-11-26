# **RBAC Backend API**

This repository contains the backend code for a **Role-Based Access Control (RBAC)** system. It is built using **Node.js**, **Express**, **MongoDB**, and **Cloudinary** for file uploads.

---

## **Features**
- **User Management**:
  - Add, edit, delete, and fetch users.
  - Manage user roles and permissions.
- **Role Management**:
  - Assign and update roles (`user`, `admin`, `subadmin`).
- **Permission Management**:
  - Update and customize user permissions.
- **Image Upload**:
  - File uploads via **Cloudinary**.

---

## **Technologies Used**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for REST APIs.
- **MongoDB**: NoSQL database for storing user and permission data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Cloudinary**: Cloud service for file uploads.
- **dotenv**: Environment variable management.
- **body-parser**: Middleware to parse request bodies.
- **CORS**: Cross-Origin Resource Sharing middleware.

---

## Setup Instructions

1. Clone the Project
```
    [git clone https://github.com/vedantxtrem/LMS-F.git](https://github.com/vedantxtrem/rbacapi.git) 
```
2. Setup Environment Variables
```
    MONGODB_URI=mongodb+srv://<username>:<password>@(link unavailable)

    CLOUDINARY_NAME=your-cloudinary-name

    CAPIKEY=your-cloudinary-api-key

    CSECRET=your-cloudinary-api-secret
```
3. Install dependecies 
```
    npm i 
```
4. Run the server
```
    npm run dev
```

API Endpoints


User Management

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/v1/user | Fetch all users. |
| GET | /api/v1/user/:id | Fetch user by ID. |
| POST | /api/v1/user | Add a new user. |
| PUT | /api/v1/user/:id | Edit user details. |
| DELETE | /api/v1/user/:id | Delete a user. |

Role Management

| Method | Endpoint | Description |
| --- | --- | --- |
| PUT | /api/v1/user/role/:id | Update user role. |

Permission Management

| Method | Endpoint | Description |
| --- | --- | --- |
| PUT | /api/v1/user/permission/:id | Update user permissions. |

Image Upload

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /api/v1/upload/generate-presigned-url | Generate Cloudinary presigned URL. |

# **Folder Structure**
![RBAC Diagram](https://res.cloudinary.com/dt5akmcnd/image/upload/v1732642482/rbac/qrrzs6hqgvmpnplt0nxy.png)


### **Deployment**
**It Deploy in render . Free Tier (Note : It will take 1-2 min on Starting the server on first time )**

## **Contributors**
### Vedant Sahu
#### ReactJS, Tailwindcss, NodeJS , NextJS , Express MonogoDB , TypeScript , JavaScript
<a href="https://in.linkedin.com/in/vedant-sahu-b4298324a" target="_blank">
  <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
<a href="https://github.com/vedantxtrem" target="_blank">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>
<a href="https://www.instagram.com/vedant_xtrem_99/" target="_blank">
  <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" alt="Instagram">
</a>

<a href="mailto:vedant@ssipmt.com" target="_blank">
  <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
</a>


**For questions or feedback, feel free to contact me!**
