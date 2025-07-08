# 🧠 User Activity Tracker – React `useEffect` Example

This project demonstrates various use cases of the `useEffect` hook in React, styled with Tailwind CSS. It includes a dark mode toggle and tracks user activity such as mouse movement, idle time, and click count, showcasing side effect management in functional components. Comprehensive tests ensure the reliability of all components.

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

The app uses Tailwind CSS for responsive styling and includes a dark mode toggle for switching between light and dark themes. Tests verify component rendering, async behavior, event handling, and state persistence.

---

## 🗂️ Project Structure

```
src/
│
├── components/
│   ├── MouseTracker.jsx
│   ├── MouseTracker.test.jsx
│   ├── IdleDetector.jsx
│   ├── IdleDetector.test.jsx
│   ├── UserInfoLoader.jsx
│   ├── UserInfoLoader.test.jsx
│   ├── ActivityLogger.jsx
│   └── ActivityLogger.test.jsx
│
├── App.jsx
├── App.test.jsx
├── index.css
├── setupTests.js
└── main.jsx
```

---

## 🔧 Components Using `useEffect`

### 1. ✅ `UserInfoLoader.jsx`

Fetches user info from an API when the component mounts (`[]` dependency array). Tests verify initial loading state, successful data fetching, and proper rendering of user data.

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

  if (loading) return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-black dark:text-white">User Info</h3>
      <p className="text-gray-600 dark:text-gray-300">Loading user info...</p>
    </div>
  );

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

Tracks mouse position using event listeners. Demonstrates cleanup. Tests verify initial rendering, mouse position updates, and event listener cleanup.

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
      <h3 className="text-lg font-semibold text-black dark:text-white">Mouse Tracker</h3>
      <p className="text-black dark:text-white">Mouse Position: X: {position.x}, Y: {position.y}</p>
    </div>
  );
}
```

---

### 3. ✅ `IdleDetector.jsx`

Detects if the user has been idle for more than 3 seconds. Tests verify initial active state, idle state after 3 seconds, idle reset on user interaction, and timer/listener cleanup.

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

Counts clicks and logs them to the console only when the count changes. Tests verify initial rendering, click counting, and console logging on count changes.

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
      <h3 className="text-lg font-semibold text-black dark:text-white">Activity Logger</h3>
      <p className="text-black dark:text-white">User has clicked {clicks} times.</p>
      <p className="text-gray-600 dark:text-gray-300"><em>(Click anywhere in this box)</em></p>
    </div>
  );
}
```

---

### 5. 🏠 `App.jsx`

Combines all components into one view with a dark mode toggle. Tests verify rendering of all components, dark mode toggling, and localStorage persistence.

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

## 🧪 Testing

The project includes comprehensive tests using Jest and React Testing Library to ensure component reliability. Tests are located in `*.test.jsx` files alongside each component.

### Setup
- **Dependencies**: Install testing dependencies:
  ```bash
  npm install --save-dev @testing-library/react @testing-library/jest-dom jest identity-obj-proxy
  ```
- **Jest Configuration** (`jest.config.js`):
  ```js
  module.exports = {
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
  ```
- **Test Setup** (`src/setupTests.js`):
  ```js
  import '@testing-library/jest-dom';
  ```

### Test Coverage
| Component        | Tests Performed                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- |
| `UserInfoLoader` | Verifies loading state, async data fetching, and rendering of user name/email       |
| `MouseTracker`   | Tests initial rendering, mouse position updates, and event listener cleanup         |
| `IdleDetector`   | Tests active/idle states, timer-based idle detection, reset on interaction, cleanup |
| `ActivityLogger` | Verifies initial rendering, click counting, and console logging on count changes    |
| `App`            | Tests rendering of all components, dark mode toggle, and localStorage persistence   |

### Running Tests
Run the tests with:
```bash
npm test
```

---

## 🔬 Try This Out

To run the project locally:

1. **Create a new Create React App project**:
   ```bash
   npx create-react-app user-activity-tracker
   cd user-activity-tracker
   ```

2. **Install Tailwind CSS and testing dependencies**:
   ```bash
   npm install -D tailwindcss postcss autoprefixer @testing-library/react @testing-library/jest-dom jest identity-obj-proxy
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

   .dark body {
     @apply bg-gray-900 text-white;
   }
   ```

5. **Configure `postcss.config.js`**:
   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

6. **Replace `src` folder contents** with the files above (`App.jsx`, `App.test.jsx`, `main.jsx`, `components/`, `setupTests.js`).

7. **Start the dev server**:
   ```bash
   npm start
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

9. **Run tests**:
   ```bash
   npm test
   ```

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
- Writing additional tests for edge cases (e.g., API failure in `UserInfoLoader`).

---

## 📦 Built With

- [React](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 📚 Learn More

- [React Docs - useEffect](https://reactjs.org/docs/hooks-effect.html)
- [Tailwind CSS Docs - Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [CRA Docs - Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [CRA Docs - Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro)
- [Jest Docs](https://jestjs.io/docs/getting-started)

---

## 🙌 Support & Contributions

Feel free to fork, improve, or submit issues and PRs! This project is meant to help developers understand how to effectively use the `useEffect` hook, Tailwind CSS, and testing in real-world scenarios.

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
- **WebStorm `@apply` IDE Error**:
  - Install the Tailwind CSS plugin: `File > Settings > Plugins > Marketplace > Tailwind CSS`.
  - Set CSS dialect to PostCSS: `File > Settings > Editor > Languages & Frameworks > Style Sheets > CSS > Dialect > PostCSS`.
  - Disable CSS validation: `File > Settings > Editor > Inspections > CSS > Invalid elements` (uncheck).
  - Add to `.idea/workspace.xml` under `<component name="PropertiesComponent">`:
    ```xml
    <property name="css.validate" value="false" />
    <property name="files.associations" value="*.css=tailwindcss" />
    ```
  - Restart WebStorm.

### Testing Issues
- **Async `fetch` in `UserInfoLoader`**:
  - Ensure `fetch` is mocked in tests using `global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ name: 'John Doe', email: 'john@example.com' }) }))`.
  - Use `waitFor` from React Testing Library to wait for async updates.
- **Timer Issues in `IdleDetector`**:
  - Use `jest.useFakeTimers('modern')` and wrap `jest.advanceTimersByTime` in `act` for timer-based tests.
- **Multiple Text Matches**:
  - Use `getByRole('heading', { name: /text/i })` to target specific elements (e.g., `<h3>`) when multiple elements match text.
- **Test Setup**:
  - Ensure `jest.config.js` and `setupTests.js` are configured as shown above.
  - Run `npm install --save-dev identity-obj-proxy` if CSS imports cause issues.

### General Issues
- Check the browser console for JavaScript or CSS errors.
- Ensure Node.js (v16+ recommended, v20.13.1 compatible) and npm versions are compatible.
- Run `npm run build` and check the output CSS for missing styles.