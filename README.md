# Responsive Personal Dashboard

## Introduction
This project is a collection of three responsive web widgets designed to provide a modern and efficient user experience. It includes a weather information widget, a news display application, and a task management application, built using the latest web technology stack.

**Weather Information Widget**: Enter a city name in the provided input field to view current weather conditions.
**News Display Application**: Browse through the latest news of different categories using the navigation bar.
**Task Management Application**: Add, edit, mark as complete, or delete tasks.

## Installation.
nsure your development environment includes Node.js and npm/yarn. And Node.js version >=18.17.0 is required.
npm install
npm run dev

## Technical Choices

- **Next.js**: Offers flexible page routing, automatic code splitting, and rich API support, simplifying the development of high-performance applications.
- **TypeScript**: Introduces type checking to catch potential errors early, enhancing code maintainability and stability.
- **Tailwind CSS**: Provides utility-first CSS classes for quickly designing custom components, significantly improving development efficiency.
- **React**: Utilizes the React framework and React Hooks (e.g., useReducer, useEffect, useCallback) for building user interfaces and managing application state.
- **UUID**: Employs the uuid library to generate unique task IDs, ensuring each task has a unique identifier.
- **Axios**: A promise-based HTTP client for making HTTP requests in browsers and node.js.
- **Geolocation API**: The built-in browser geolocation API for obtaining the user's current geographical location.
- **Framer Motion**: An animation library for React, used to implement smooth animations.
- **React Context API**: Manages state sharing between components, such as the current active navigation item and categories.
