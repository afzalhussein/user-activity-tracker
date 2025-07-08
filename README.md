# 🧠 User Activity Tracker – React `useEffect` Example

This project demonstrates various use cases of the `useEffect` hook in React, styled with Tailwind CSS. It includes a dark mode toggle and tracks user activity such as mouse movement, idle time, and click count, showcasing side effect management in functional components.

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![React Hook useState](https://img.shields.io/badge/React%20Hook%20useState-%23EC5990.svg?style=flat&logo=reacthookform&logoColor=white)
![React Hook useEffect](https://img.shields.io/badge/React%20Hook%20useEffect-%23EC5990.svg?style=flat&logo=reacthookform&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
## Light mode

![image](https://github.com/user-attachments/assets/43da4c45-42c4-4328-ace2-d279c9672aaf)

## Dark mode

![image](https://github.com/user-attachments/assets/e70826a7-30a3-41ab-9e13-f66704e4ec36)

## 🧩 Project Overview

A simple React app that tracks user activity using `useEffect` for:
- Fetching data from an API
- Subscribing/unsubscribing to browser events
- Managing timers and cleanup logic
- Conditional re-running based on dependencies

The app uses Tailwind CSS for responsive styling and includes a dark mode toggle for switching between light and dark themes.

---

## 🗂️ Project Structure

```
src/
│
├── components/
│   ├── MouseTracker.jsx
│   ├── IdleDetector.jsx
│   ├── UserInfoLoader.jsx
│   └── ActivityLogger.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🔧 Components Using `useEffect`

### 1. ✅ `UserInfoLoader.jsx`

Fetches user info from an API when the component mounts (`[]` dependency array).

```jsx
import React, { useState, useEffect } from 'react';

export default function UserInfoLoader() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching user data...');
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-600 dark:text-gray-300">Loading user info...</p>;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-black dark:text-white">User Info</h3>
      <p className="text-black dark:text-white"><strong>Name:</strong> {user.name}</p>
      <p className="text-black dark:text-white"><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
```

---

### 2. ✅ `MouseTracker.jsx`

Tracks mouse position using event listeners. Demonstrates cleanup.

```jsx
import React, { useState, useEffect } from 'react';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-black dark:text-white">Mouse Position</h3>
      <p className="text-black dark:text-white">X: {position.x}, Y: {position.y}</p>
    </div>
  );
}
```

---

### 3. ✅ `IdleDetector.jsx`

Detects if the user has been idle for more than 3 seconds.

```jsx
import React, { useState, useEffect } from 'react';

export default function IdleDetector() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), 3000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer(); // Initialize

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-black dark:text-white">User Status</h3>
      <p className="text-black dark:text-white">{isIdle ? 'You are idle.' : 'You are active.'}</p>
    </div>
  );
}
```

---

### 4. ✅ `ActivityLogger.jsx`

Counts clicks and logs them to the console only when the count changes.

```jsx
import React, { useState, useEffect } from 'react';

export default function ActivityLogger() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log(`User clicked ${clicks} times`);
  }, [clicks]);

  const handleClick = () => {
    setClicks(prev => prev + 1);
  };

  return (
    <div onClick={handleClick} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-black dark:text-white">Click Counter</h3>
      <p className="text-black dark:text-white">Total Clicks: {clicks}</p>
      <p className="text-gray-600 dark:text-gray-300">(Click anywhere in this box)</p>
    </div>
  );
}
```

---

### 5. 🏠 `App.jsx`

Combines all components into one view with a dark mode toggle.

```jsx
import React, { useEffect, useState } from 'react';
import UserInfoLoader from './components/UserInfoLoader';
import MouseTracker from './components/MouseTracker';
import ActivityLogger from './components/ActivityLogger';
import IdleDetector from './components/IdleDetector';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🧠 User Activity Tracker</h1>
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        Toggle Dark Mode
      </button>
      <hr className="my-4 border-gray-300 dark:border-gray-700" />
      <UserInfoLoader />
      <hr className="my-4 border-gray-300 dark:border-gray-700" />
      <MouseTracker />
      <hr className="my-4 border-gray-300 dark:border-gray-700" />
      <IdleDetector />
      <hr className="my-4 border-gray-300 dark:border-gray-700" />
      <ActivityLogger />
    </div>
  );
}
```

---

### 6. 🚀 `main.jsx`

Entry point using React 18+ with `createRoot`.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## 🔬 Try This Out

To run the project locally:

1. **Create a new Create React App project**:
   ```bash
   npx create-react-app user-activity-tracker
   cd user-activity-tracker
   ```

2. **Install Tailwind CSS**:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

3. **Configure `tailwind.config.js`**:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
     darkMode: 'class',
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

4. **Set up `src/index.css`**:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Replace `src` folder contents** with the files above (`App.jsx`, `main.jsx`, `components/`).

6. **Start the dev server**:
   ```bash
   npm start
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Key Concepts Demonstrated

| Component        | Use of `useEffect`                             |
| ---------------- | ---------------------------------------------- |
| `UserInfoLoader` | Runs once (on mount) to fetch data             |
| `MouseTracker`   | Adds/removes event listener; cleanup used      |
| `IdleDetector`   | Uses timer and cleanup for debouncing          |
| `ActivityLogger` | Effect runs conditionally when `clicks` change |
| `App`            | Toggles dark mode and persists state           |

---

## 🧰 Bonus Challenge (Optional)

Try extending the app by:
- Adding global state with `useReducer` or Redux.
- Persisting data (e.g., click count or user activity) in `localStorage`.
- Displaying a list of logged activities in the UI.
- Persisting the dark mode state across sessions (already implemented in `App.jsx`).

---

## 📦 Built With

- [React](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📚 Learn More

- [React Docs - useEffect](https://reactjs.org/docs/hooks-effect.html)
- [Tailwind CSS Docs - Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [CRA Docs - Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [CRA Docs - Deployment](https://facebook.github.io/create-react-app/docs/deployment)

---

## 🙌 Support & Contributions

Feel free to fork, improve, or submit issues and PRs! This project is meant to help developers understand how to effectively use the `useEffect` hook and Tailwind CSS in real-world scenarios.

---

## 🔍 Troubleshoot

### Tailwind CSS Issues
- **Dark Mode Not Working**:
  - Ensure `darkMode: 'class'` is set in `tailwind.config.js`.
  - Verify the `dark` class is added to the `<html>` tag (not `<body>`) in `App.jsx`.
  - Check that components use `dark:` variant styles (e.g., `dark:bg-gray-900`, `dark:text-white`).
  - Confirm Tailwind CSS is compiled by checking the CSS file in the browser's DevTools (Network tab, search for `dark:` classes).
- **PostCSS 8 Compatibility**:
  - If you encounter PostCSS 8 issues with Create React App, refer to [this guide](https://grok.com/share/c2hhcmQtMw%3D%3D_cb106cc9-2fca-45e2-bedf-9870897d7c83).
- **CSS Not Applying**:
  - Ensure `src/index.css` contains Tailwind directives and is imported in `main.jsx`.
  - Verify the `content` array in `tailwind.config.js` includes your component files (`./src/**/*.{html,js,jsx,ts,tsx}`).

### General Issues
- Check the browser console for JavaScript or CSS errors.
- Ensure Node.js and npm versions are compatible (Node.js v16+, npm v7+).
- Run `npm run build` and check the output CSS for missing styles.
