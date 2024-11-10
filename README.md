# Task Manager App

This is a Task Manager application built with React for the frontend and Node.js/Express for the backend. The app allows users to create, view, edit, and delete tasks, with options to filter tasks based on their completion status.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

- Create, edit, delete, and view tasks.
- Filter tasks by completion status (completed or pending).
- Navigate between Task List and Dashboard views.

## Tech Stack

- **Frontend:** React, React Router
- **Backend:** Node.js, Express, MongoDB (or other database)
- **Styling:** Custom CSS

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed (or an alternative database setup)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm run dev
    ```

4. Open the app in your browser at `http://localhost:5173`.

### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables:

    ```env
    PORT=5001
    MONGO_URI=your_mongo_db_connection_string
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

5. The backend server will run on `http://localhost:5001`.

### Connecting Frontend and Backend

Ensure the frontend is set up to communicate with the backend API by setting the correct API base URL in your frontend code. You may need to adjust the base URL for API requests to `http://localhost:5001`.

## Usage

Once both servers are running, open the frontend in your browser (`http://localhost:3000`). You can navigate between the Task List and Dashboard views using the navigation bar.

- **Task List**: View, create, edit, delete, and filter tasks.
- **Dashboard**: View additional information and statistics about tasks.


## Folder Structure


