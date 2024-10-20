# Next.js User Management App

This is a Next.js project that allows users to register, login, view the dashboard in list and grid views, and logout. The app is built with **Material UI** for the user interface, **React Hook Form** for form handling, and **RTK Query** for managing API data.

## Features

- **User Registration**: New users can register by filling out a form. After successful registration, a popup confirms that the registration was successful.
- **Login**: Users can log in with the same credentials used during registration. After logging in, they are redirected to the dashboard.
- **Dashboard**: Once logged in, users can see a dashboard displaying items in two views: **list view** and **grid view**.
- **Logout**: Users can log out of the app and will be redirected back to the login page.
- **Switch to Registration**: From the login page, users can navigate back to the registration page to register a new user.

## Tech Stack

- **Next.js**: React framework used for building the application.
- **Material UI (MUI)**: A React component library used for creating the user interface.
- **RTK Query**: A data-fetching and state management tool used to manage API calls.
- **React Hook Form**: Library for handling form validation and submission.

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- **Node.js** installed on your machine. [Download Node.js](https://nodejs.org/en/download/)
- **Git** for version control.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/satyamrkushwaha/satyam-kushwaha-sociosquares-assignment.git or download zip file
    cd your-nextjs-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

### Project Structure

- **pages**: Contains the `register`, `login`, and `dashboard` pages.
- **components**: Reusable components like `Card`.
- **store**: Contains the Redux store setup and slices for managing user authentication and dashboard data.
- **api**: Contains API calls handled via RTK Query.

## How It Works

### 1. Registration

- Navigate to the **Register** page.
- Fill in the form and submit it.
- A popup will appear confirming successful registration.

### 2. Login

- After successful registration, you'll be redirected to the **Login** page.
- Log in with the same credentials you used during registration.
- After logging in, you will be redirected to the **Dashboard**.

### 3. Dashboard

- The **Dashboard** will display data in **list view** by default. 
- You can toggle between **list view** and **grid view** using the view switch option.
- The data shown on the dashboard is fetched from an API using **RTK Query**.

### 4. Logout

- On the dashboard page, there is a **Logout** button.
- Clicking it will log you out and redirect you back to the **Login** page.

### 5. Additional Features

- On the **Login** page, there's an option to navigate back to the **Register** page if you'd like to register a new user.

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm run start`**: Runs the production build.

## Dependencies

- **Next.js**: `^13.x`
- **Material UI**: `^5.x`
- **RTK Query**: `^1.x`
- **React Hook Form**: `^7.x`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

Thanks to the open-source community for providing great tools and libraries to build this app.

