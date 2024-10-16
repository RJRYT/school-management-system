# School Management System API Documentation

## Overview
This document provides the API details for the School Management System. The system manages student information, fees history, and library records through role-based access control. Most routes require authentication.

### Base URL
#### http://localhost:5000/api

---

## Table of Contents
1. [Authentication](#authentication)
2. [User](#user)
3. [Students](#students)
4. [Fees](#fees)
5. [Library](#library)
6. [Users](#users)

---

### Authentication 
 - Route: [authRoutes.js](routes/authRoutes.js)
 - Controller: [authController.js](controllers/authController.js)

    #### Login
    - **URL**: `/auth/login`
    - **Method**: `POST`
    - **Description**: Authenticate a user and retrieve a JWT token.
    - **Request Body**:
        ```json
        {
            "email": "admin@example.com",
            "password": "password"
        }
        ```
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "token": "jwt_token"
        }
        ```
        - **Status**: `401 Bad Request` 
        - **Body**:
        ```json
        {
            "message": "Invalid credentials"
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "message": "Server error"
        }
        ```
    ---
    #### Register 
    - **URL**: `/auth/register`
    - **Method**: `POST`
    - **Description**: Add a new user to the records (its added for initial user account creation. can be removed later).
    - **Request Body**:
        ```json
        {
            "name": "admin",
            "email": "admin@example.com",
            "password": "password",
            "role": "Admin"
        }
        ```
    - **Response**:
        - **Status**: `201 Created`
        - **Body**:
        ```json
        {
            "message": "User registered"
        }
        ```
        - **Status**: `401 Bad Request` 
        - **Body**:
        ```json
        {
            "message": "User already exists"
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "message": "Server error"
        }
        ```

---

### User
- Route: [userRoutes.js](routes/userRoutes.js)
- Controller: [userController.js](controllers/userController.js)

    #### Verify
    - **URL**: `/user/me`
    - **Method**: `GET`
    - **Description**: Verify user authentication and return user data.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff, Librarian`
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success": true,
            "user": 
            {
                "name": "admin",
                "email": "admin@example.com",
                "password": "encoded password",
                "superAdmin": true,
                "role": "Admin",
            }
        }
        ```
        - **Status**: `404 Not Found` 
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "User not found"
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Server error"
        }
        ```
---
 
### Students
- Route: [studentRoutes.js](routes/studentRoutes.js)
- Controller: [studentController.js](controllers/studentController.js)

    #### Get All Students
    - **URL**: `/student`
    - **Method**: `GET`
    - **Description**: Retrieve a list of all students.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff, Librarian`
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        [
            {
                "_id": "3210",
                "name": "John Doe",
                "rollNumber": "123",
                "class": "10th Grade"
                ...
            },
            ...
        ]
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Server error"
        }
        ```

    #### Get Student by ID
    - **URL**: `/student/:id`
    - **Method**: `GET`
    - **Description**: Retrieve a specific student's details by their ID.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff, Librarian`
    - **Path Parameters**:
        - `id`: The unique ID of the student.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "_id": "123455",
            "name": "John Doe",
            "rollNumber": "123",
            "class": "10th Grade"
            ...
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Student not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

    #### Add a New Student
    - **URL**: `/student`
    - **Method**: `POST`
    - **Description**: Create a new student.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff`
    - **Request Body**:
        ```json
        {
            "name": "name",
            "class": "10",
            "section": "A"
            ...
        }
        ```
    - **Response**:
        - **Status**: `201 Created`
        - **Body**:
        ```json
        {
            "success":true,
            "student": 
            {
                "_id": "12345",
                "name": "name",
                "class": "10",
                "section": "A"
                ...
            }
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "message": "Server error"
        }
        ```

    #### Update Existing Student
    - **URL**: `/student/:id`
    - **Method**: `PUT`
    - **Description**: Update Existing student details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff`
    - **Path Parameters**:
        - `id`: The unique ID of the student.
    - **Request Body**:
        ```json
        {
            "name": "name",
            "class": "10",
            "section": "A"
            ...
        }
        ```
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success":true,
            "student": 
            {
                "_id": "12345",
                "name": "name",
                "class": "10",
                "section": "A"
                ...
            }
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Student not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```


    
    #### Delete Existing Student
    - **URL**: `/student/:id`
    - **Method**: `DELETE`
    - **Description**: Delete Existing student details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Path Parameters**:
        - `id`: The unique ID of the student.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success": true, 
            "message": "Student deleted successfully"
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Student not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

---

### Fees
- Route: [feesRoutes.js](routes/feesRoutes.js)
- Controller: [feesController.js](controllers/feesController.js)

    #### Get All Fees history
    - **URL**: `/fees`
    - **Method**: `GET`
    - **Description**: Retrieve a list of all fees history.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff, Librarian`
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        [
            {
                "_id": "3210",
                "amountPaid": 100,
                "paymentMethod": "cash",
                "feesStatus": "Pending",
                "studentId":
                {
                    "_id": "3210",
                    "name": "john"
                }
                ...
            },
            ...
        ]
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Server error"
        }
        ```

    #### Get Fees History by ID
    - **URL**: `/fees/:id`
    - **Method**: `GET`
    - **Description**: Retrieve a specific fees history details by their ID.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff, Librarian`
    - **Path Parameters**:
        - `id`: The unique ID of the Fees history.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "_id": "3210",
            "amountPaid": 100,
            "paymentMethod": "cash",
            "feesStatus": "Pending",
            "studentId":
            {
                "_id": "3210",
                "name": "john"
            }
            ...
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Fees history not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

    #### Add a New Fees history
    - **URL**: `/fees`
    - **Method**: `POST`
    - **Description**: Create a new fees history.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff`
    - **Request Body**:
        ```json
        {
            "studentId": "12345",
            "amountPaid": 1000,
            "paymentMethod": "Cash"
            ...
        }
        ```
    - **Response**:
        - **Status**: `201 Created`
        - **Body**:
        ```json
        {
            "success":true,
            "data": 
            {
                "_id": "12345",
                "studentId": "12345",
                "amountPaid": 1000,
                "paymentMethod": "Cash"
                ...
            }
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "message": "Server error"
        }
        ```

    #### Update Existing Fees history
    - **URL**: `/fees/:id`
    - **Method**: `PUT`
    - **Description**: Update Existing fees history details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff`
    - **Path Parameters**:
        - `id`: The unique ID of the fees history.
    - **Request Body**:
        ```json
        {
            "studentId": "12345",
            "amountPaid": 1000,
            "paymentMethod": "Cash"
            ...
        }
        ```
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success":true,
            "data": 
            {
                "_id": "12345",
                "studentId": "12345",
                "amountPaid": 1000,
                "paymentMethod": "Cash"
                ...
            }
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "fees history not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

    #### Delete Existing Fees History
    - **URL**: `/fees/:id`
    - **Method**: `DELETE`
    - **Description**: Delete Existing fees history details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Path Parameters**:
        - `id`: The unique ID of the fees history.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success": true, 
            "message": "Deleted successfully"
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "fees history not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

---

### Library
- Route: [libraryRoutes.js](routes/libraryRoutes.js)
- Controller: [libraryController.js](controllers/libraryController.js)

    #### Get All Library history
    - **URL**: `/library`
    - **Method**: `GET`
    - **Description**: Retrieve a list of all library history.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff, Librarian`
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        [
            {
                "_id": "3210",
                "bookTitle": "sample book title",
                "issueDate": "12-05-2024",
                "studentId":
                {
                    "_id": "3210",
                    "name": "john",
                    "rollNumber": 67
                }
                ...
            },
            ...
        ]
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Server error"
        }
        ```

    #### Get Library History by ID
    - **URL**: `/library/:id`
    - **Method**: `GET`
    - **Description**: Retrieve a specific library history details by their ID.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, OfficeStaff, Librarian`
    - **Path Parameters**:
        - `id`: The unique ID of the Library history.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "_id": "3210",
            "bookTitle": "sample book title",
            "issueDate": "12-05-2024",
            "studentId":
            {
                "_id": "3210",
                "name": "john",
                "rollNumber": 67
            }
            ...
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "history not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

    #### Add a New Library history
    - **URL**: `/library`
    - **Method**: `POST`
    - **Description**: Create a new library history.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, Librarian`
    - **Request Body**:
        ```json
        {
            "studentId": "12345",
            "bookTitle": "sample book title",
            "issueDate": "12-05-2024"
            ...
        }
        ```
    - **Response**:
        - **Status**: `201 Created`
        - **Body**:
        ```json
        {
            "success":true,
            "data": 
            {
                "_id": "12345",
                "studentId": "12345",
                "bookTitle": "sample book title",
                "issueDate": "12-05-2024"
                ...
            }
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "message": "Server error"
        }
        ```

    #### Update Existing Library history
    - **URL**: `/library/:id`
    - **Method**: `PUT`
    - **Description**: Update Existing library history details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin, Librarian`
    - **Path Parameters**:
        - `id`: The unique ID of the library history.
    - **Request Body**:
        ```json
        {
            "studentId": "12345",
            "bookTitle": "sample book title",
            "issueDate": "12-05-2024",
            ...
        }
        ```
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success":true,
            "data": 
            {
                "_id": "12345",
                "studentId": "12345",
                "bookTitle": "sample book title",
                "issueDate": "12-05-2024",
                ...
            }
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "history not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

    #### Delete Existing Library History
    - **URL**: `/library/:id`
    - **Method**: `DELETE`
    - **Description**: Delete Existing library history details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Path Parameters**:
        - `id`: The unique ID of the library history.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success": true, 
            "message": "Deleted successfully"
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "history not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

---

### Users
- Route: [usersRoutes.js](routes/usersRoutes.js)
- Controller: [usersController.js](controllers/usersController.js)

    #### Get All Users
    - **URL**: `/users`
    - **Method**: `GET`
    - **Description**: Retrieve a list of all users.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success": true, 
            "data": 
            [
                {
                    "name": "admin",
                    "email": "admin@example.com",
                    "password": "encoded password",
                    "superAdmin": false,
                    "role": "Admin",
                },
                ...
            ]
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "Server error"
        }
        ```

    #### Get Users by ID
    - **URL**: `/users/:id`
    - **Method**: `GET`
    - **Description**: Retrieve a specific user details by their ID.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Path Parameters**:
        - `id`: The unique ID of the user.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success": true, 
            "data": 
            {
                "name": "admin",
                "email": "admin@example.com",
                "password": "encoded password",
                "superAdmin": false,
                "role": "Admin",
            }
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "user not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

    #### Add a New User
    - **URL**: `/users`
    - **Method**: `POST`
    - **Description**: Create a new user.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Request Body**:
        ```json
        {
            "name": "admin", 
            "email": "admin@gmail.com", 
            "password": "password", 
            "role": "Admin
        }
        ```
    - **Response**:
        - **Status**: `201 Created`
        - **Body**:
        ```json
        {
            "success":true,
            "data": 
            {
                "_id": "12345",
                "name": "admin", 
                "email": "admin@gmail.com", 
                "password": "encoded password", 
                "role": "Admin
            }
        }
        ```
        - **Status**: `500 Internal Server Error` 
        - **Body**:
        ```json
        {
            "message": "Server error"
        }
        ```

    #### Update Existing User
    - **URL**: `/users/:id`
    - **Method**: `PUT`
    - **Description**: Update Existing user details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Path Parameters**:
        - `id`: The unique ID of the user.
    - **Request Body**:
        ```json
        {
            "name": "admin", 
            "email": "admin@gmail.com", 
            "password": "password", 
            "role": "Admin
        }
        ```
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success":true,
            "data": 
            {
                "_id": "12345",
                "name": "admin", 
                "email": "admin@gmail.com", 
                "password": "encoded password", 
                "role": "Admin
            }
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "user not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

    #### Delete Existing user
    - **URL**: `/users/:id`
    - **Method**: `DELETE`
    - **Description**: Delete Existing user details.
    - **Authentication**: Required
    - **Allowed Roles**: `Admin`
    - **Path Parameters**:
        - `id`: The unique ID of the user.
    - **Response**:
        - **Status**: `200 OK`
        - **Body**:
        ```json
        {
            "success": true, 
            "message": "Deleted successfully"
        }
        ```
        - **Status**: `404 Not Found`
        - **Body**:
        ```json
        {
            "success": false, 
            "message": "user not found"
        }
        ```
        - **Status**: `500 Internal Server Error`
        - **Body**:
        ```json
        {
            "message": "Server Error"
        }
        ```

---

## Status Codes
- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `204 No Content`: The resource was successfully deleted.
- `400 Bad Request`: There was an issue with the request.
- `401 Unauthorized`: Authentication failed or was not provided.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.
