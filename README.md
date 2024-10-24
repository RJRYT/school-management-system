# School Management System

## Project Description

The School Management System is a web application designed to facilitate the management of student details, library history, and fees history across various classes within a school. The system implements Role-Based Access Control (RBAC) to ensure that users can only access features relevant to their roles: School Admin, Office Staff, and Librarian.

## Features

- **User Authentication**: Secure login for different roles.
- **CRUD Operations**: Manage student details, library history, and fees history.
- **Role-Based Access Control**: Different access levels for Admin, Office Staff, and Librarians.
- **Confirmation Dialogs**: Prevent accidental deletions or modifications.

## Tech Stack

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux for global state management

## Setup Instructions

### Prerequisites

- Node.js (>= 18.x)
- MongoDB (local installation or Atlas)
- Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/RJRYT/school-management-system.git
   cd school-management-system/server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the server directory with the following environment variables:

    ```plaintext
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:

    ```bash
    npm start
    ```

### Backend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `client` directory with the following environment variables:

    ```plaintext
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. Start the React application:

    ```bash
    npm start
    ```

## Deployment Instructions

### Backend Deployment

1. Deploy the backend on [Render](https://render.com).

2. Configure environment variables as specified above.

### Frontend Deployment

1. Deploy the frontend on [Vercel](https://vercel.com).

2. Set up the build settings and environment variables.

### Demo

[vercel.com](https://school-management-system-rjryt.vercel.app)

- admin account: admin@gmail.com 
- password: admin

## List of Used Libraries

### Backend Libraries

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs

### Frontend Libraries

- react
- react-dom
- react-router-dom
- redux
- axios

## Video Presentation

[Youtube](https://youtu.be/pjWPNRGWVMY)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.