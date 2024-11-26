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

## **Installation**

### **1. Clone the Repository**

Run the following command to install all required dependencies:

bash
npm install


2. Setup Environment Variables

Create a .env file in the root directory and add the following environment variables:

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@(link unavailable)
CLOUDINARY_NAME=your-cloudinary-name
CAPIKEY=your-cloudinary-api-key
CSECRET=your-cloudinary-api-secret


3. Run the Server

Start the server using the following command:

bash
npm start

The server will start at http://localhost:5000.

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

Folder Structure



rbac-backend/
├── models/
│   ├── user.model.js
│   ├── permission.model.js
├── routes/
│   ├── user.routes.js
│   ├── upload.routes.js
├── controller/
│   ├── user.controller.js
├── utils/
│   ├── error.utils.js
├── .env
├── app.js
├── server.js
├── package.json


Environment Variables


The application uses a .env file to manage sensitive configurations. Below are the required variables:

- PORT: Port number for the server (e.g., 5000).
- MONGODB_URI: MongoDB connection string.
- CLOUDINARY_NAME: Your Cloudinary account name.
- CAPIKEY: Cloudinary API key.
- CSECRET: Cloudinary API secret.

Deployment


Local Deployment

Follow the installation steps above. Run the server using:

bash
npm start

Access the server at http://localhost:5000.

Production Deployment

Use platforms like Heroku, AWS, or Vercel. Ensure environment variables are configured properly in the hosting platform. Deploy your codebase.

License


This project is licensed under the MIT License. Feel free to use, modify, and distribute this code as per the license terms.

Contributors


Your Name: GitHub Profile

For questions or feedback, feel free to contact me!