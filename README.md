# 🧠 User Activity Tracker – React `useEffect` Example

This project demonstrates various use cases of the `useEffect` hook in React, including:

- Fetching data from an API
- Subscribing/unsubscribing to browser events
- Managing timers and cleanup logic
- Conditional re-running based on dependencies

## 🧩 Project Overview

A simple app that tracks user activity such as mouse movement, idle time, and click count. Each feature is implemented using `useEffect` to show how side effects are handled in functional components.

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

  if (loading) return <p>Loading user info...</p>;

  return (
    <div>
      <h3>User Info</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
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
    <div>
      <h3>Mouse Position</h3>
      <p>X: {position.x}, Y: {position.y}</p>
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
    <div>
      <h3>User Status</h3>
      <p>{isIdle ? 'You are idle.' : 'You are active.'}</p>
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
    <div onClick={handleClick}>
      <h3>Click Counter</h3>
      <p>Total Clicks: {clicks}</p>
      <p>(Click anywhere in this box)</p>
    </div>
  );
}
```

---

### 5. 🏠 `App.jsx`

Combines all components into one view.

```jsx
import React from 'react';
import UserInfoLoader from './components/UserInfoLoader';
import MouseTracker from './components/MouseTracker';
import IdleDetector from './components/IdleDetector';
import ActivityLogger from './components/ActivityLogger';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🧠 User Activity Tracker</h1>

      <UserInfoLoader />
      <hr />

      <MouseTracker />
      <hr />

      <IdleDetector />
      <hr />

      <ActivityLogger />
    </div>
  );
}

export default App;
```

---

### 6. 🚀 `main.jsx`

Entry point using React 18+ with `createRoot`.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## 🔬 Try This Out

To run the project locally:

```bash
# Step 1: Create a new CRA app
npx create-react-app user-activity-tracker
cd user-activity-tracker

# Step 2: Replace src folder contents with the files above

# Step 3: Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Key Concepts Demonstrated

| Component        | Use of `useEffect`                             |
| ---------------- | ---------------------------------------------- |
| `UserInfoLoader` | Runs once (on mount) to fetch data             |
| `MouseTracker`   | Adds/removes event listener; cleanup used      |
| `IdleDetector`   | Uses timer and cleanup for debouncing          |
| `ActivityLogger` | Effect runs conditionally when `clicks` change |

---

## 🧰 Bonus Challenge (Optional)

Try extending the app by:

- Adding global state with `useReducer` or Redux.
- Persisting data in `localStorage`.
- Displaying a list of logged activities in the UI.

---

## 📦 Built With

- [React](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)

---

## 📚 Learn More

- [React Docs - useEffect](https://reactjs.org/docs/hooks-effect.html)
- [CRA Docs - Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [CRA Docs - Deployment](https://facebook.github.io/create-react-app/docs/deployment)

---

## 🙌 Support & Contributions

Feel free to fork, improve, or submit issues and PRs! This project is meant to help developers understand how to effectively use the `useEffect` hook in real-world scenarios.

---

Let me know if you'd like this as a downloadable ZIP, GitHub repo template, or hosted demo link!