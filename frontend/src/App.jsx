import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import "./assets/css/App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.setItem("user_agent", navigator.userAgent);
    // Checks if this localStorage is with the client, if yes nothing happens, if not it gets created; this helps in securing the routes
    let access = localStorage.getItem("user_access_status");
    if (!access) {
      localStorage.setItem("user_access_status", "false");
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
