# Learning Support Backend
The backend for the Learning Support application is designed to provide a transformative peer-to-peer learning ecosystem for secondary school students, with a focus on session management, progress tracking, and parental engagement. The project is currently in progress and aims to help students manage their study time while keeping parents informed of their progress.

## Tech Stack

Built with Node.js, Express, TypeScript, and MySQL.
Includes tools for authentication, session management, input validation, password security, background task scheduling, and development workflow enhancements.

## Project Setup

### Prerequisites

- Node.js
Ensure a recent stable version is installed for best performance.

- Relational Database
A compatible database system to store application data.


## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/dan-codeit/coace_backend.git
cd coace_backend
```

Install the required dependencies by running:

```bash
npm install
```
## Configuration
1. Database Setup:
Ensure that MySQL is installed and running. Create a database (e.g., learning_support_db) to store your application data.

2. Environment Variables:
Create a .env file in the root directory as in the .env.example file.
## Development Mode
To run the backend in development mode, use:

```bash
npm run dev
```
This will start the application with Nodemon for automatic reloading.

## Build for Production
To build the TypeScript project for production, run:

```bash
npm run build
```
Then start the production server:

```bash
npm start
```
## Routes

### Public Routes
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Login to the system.
POST /api/auth/reset-password: Reset the password using the reset token.

### Protected Routes
GET /api/users/me: Fetch the logged-in user's details.
PUT /api/users/update: Update the logged-in user's details.

GET /api/users/session-history: View the user's session participation history.
Routes are protected using express-session. Access to certain routes requires specific roles such as admin, student, or parent.

## Authentication
The system uses session-based authentication via express-session. After successful login, users will receive a session cookie that persists until they log out or the session expires.


## License
This project is licensed under the Non-Commercial Use License. You may not use, distribute, or sell the application or any part of it for commercial purposes.

## In Progress
The backend development is currently in progress. Key features are being developed, including user management, session tracking, and parental notifications.

