# Product Management

This is a modern, responsive web application built with React and TypeScript for efficient product management and display. It serves as a comprehensive platform to showcase products, manage user favorites, and provide a seamless browsing experience. The application leverages a robust state management system and a component-based architecture for scalability and maintainability.

## Features

- **Product Listing:** Browse through a comprehensive list of products.
- **Product Detail View:** View detailed information for each product.
- **Favorites Management:** Add and remove products from your personal favorites list.
- **Search Functionality:** Easily find products using the integrated search bar.
- **Responsive Design:** Optimized for various screen sizes, providing a consistent user experience across devices.
- **Robust State Management:** Utilizes Redux Toolkit and Zustand for predictable state handling.
- **API Integration:** Seamless communication with backend services for data retrieval and manipulation.

## Tech Stack

This project is built using the following key technologies and libraries:

- **Frontend:**
  - [React](https://react.dev/): A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static types.
  - [Vite](https://vitejs.dev/): A fast frontend build tool that provides an excellent developer experience.
  - [Redux Toolkit](https://redux-toolkit.js.org/): The official, opinionated, batteries-included toolset for efficient Redux development.
  - [React Router DOM](https://reactrouter.com/en/main): Declarative routing for React.
  - [Axios](https://axios-http.com/): Promise-based HTTP client for the browser and Node.js.
  - [React Loading Skeleton](https://www.react-loading-skeleton.com/): A library for creating beautiful loading skeletons.
- **Testing:**
  - [Vitest](https://vitest.dev/): A blazing fast unit test framework powered by Vite.
  - [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/): Utilities for testing React components.
  - [jsdom](https://github.com/jsdom/jsdom): A JavaScript implementation of the WHATWG DOM and HTML standards, for use with Node.js.
- **Linting:**
  - [ESLint](https://eslint.org/): Pluggable JavaScript linter.

## Project Structure

The project follows a component-based architecture with a clear separation of concerns:

```
.
├───public/                      # Static assets
├───src/
│   ├───apiServices/             # API call configurations and endpoints
│   ├───assets/                  # Images, icons, fonts
│   ├───common/                  # Reusable UI components (Buttons, Inputs, Modals, etc.)
│   ├───layout/                  # Application layout components (Header, Sidebar)
│   ├───pages/                   # Top-level views/routes (Dashboard, Products, Favorites, etc.)
│   ├───redux/                   # Redux store, slices, and middleware for global state management
│   ├───utils/                   # Utility functions, constants, and helpers
│   ├───App.tsx                  # Main application component
│   ├───main.tsx                 # Entry point of the React application
│   ├───router.tsx               # Application routing configuration
│   └───...
└───...
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd product-management
    ```

    _(Replace `<repository-url>` with the actual URL of your repository.)_

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
npm start
# or
yarn dev
# or
yarn start
```

The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev` or `npm start`: Starts the development server.
- `npm run build`: Builds the application for production to the `dist` folder.
- `npm run lint`: Lints the project files for potential errors and style inconsistencies.
- `npm run preview`: Serves the production build locally for previewing.
- `npm run test`: Runs all tests in interactive watch mode.
- `npm run test:ui`: Runs tests with a Vitest UI.
- `npm run test:run`: Runs all tests once and exits.
- `npm run test:coverage`: Runs tests and generates a code coverage report.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
