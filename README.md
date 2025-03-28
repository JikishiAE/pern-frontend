# PERN - Frontend

This is the frontend application for the pern project. It's built using React, Vite, and Tailwind CSS, providing a fast and modern user interface.

## Project Overview

This frontend application is designed to interact with a backend (likely a PERN stack, as indicated by the directory structure `pern-frontend`). It focuses on delivering a responsive and visually appealing user experience.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces. It's used here to create a component-based architecture for the application.
*   **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects. It's used for development, building, and serving the application.
*   **Tailwind CSS:** A utility-first CSS framework that allows for rapid UI development by providing a set of pre-defined CSS classes.
*   **TypeScript:** (Implied) While not explicitly stated in the `vite.config.ts`, the `.ts` extension suggests that TypeScript is being used for type safety and improved code maintainability.
* **Node.js and npm/yarn:** (Implied) These are the runtime environment and package manager used to run the project.

## Project Setup and Configuration

### Prerequisites

*   **Node.js:** Make sure you have Node.js (version 16 or higher recommended) installed on your system.
*   **npm or yarn:** You'll need a package manager to install dependencies. npm comes with Node.js, or you can install yarn separately.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd pern-frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install  # or yarn install
    ```

### Development

1.  **Start the development server:**
    ```bash
    npm run dev # or yarn dev
    ```
    This will start a local development server, usually at `http://localhost:5173/`. Vite's hot module replacement (HMR) will automatically update the browser as you make changes to the code.

### Building for Production

1.  **Build the project:**
    ```bash
    npm run build # or yarn build
    ```
    This will create an optimized production build of the application in the `dist` directory.

### Environment Variables

*   **Location:** Environment variables are stored in files within the `./envs` directory.
*   **Usage:** Vite automatically loads environment variables from files in the `envs` directory. You can access them in your code using `import.meta.env`.
* **Example:**
    * Create a file `envs/.env.development`
    * Add a variable `VITE_URL_BACKEND=http://localhost:3000/api`
    * Access it in your code: `const apiUrl = import.meta.env.VITE_URL_BACKEND`
* **Important:** Remember to prefix your variables with `VITE_` to be accessible in the frontend.

### vite.config.ts

The `vite.config.ts` file is the main configuration file for Vite. Here's a breakdown of the current configuration:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  envDir: './envs', // Specifies the directory for environment variable files.
  plugins: [
    react(), // Enables React support in Vite.
    tailwindcss(), // Enables Tailwind CSS support in Vite.
  ],
})
