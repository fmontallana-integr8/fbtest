import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { auth } from "../dbconfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import PhoneAuth from "./PhoneAuth";

function App() {
  const provider = new GoogleAuthProvider();
  const [count, setCount] = useState(0);

  const handleSignUp = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);

      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleSignUp}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <PhoneAuth />
    </>
  );
}

export default App;
