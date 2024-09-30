import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import "./assets/css/App.css";
import { useEffect } from "react";
import Gate from "./Components/Gate";
import RoutesAuth from "./utils/RoutesAuth";
import Dashboard from "./Components/Dashboard";
import Mainboard from "./Components/OutletComponents/Mainboard";

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
          <Route path="/gate" element={<Gate />} />
          <Route element={<RoutesAuth />}>
            <Route path="/dashboard/:uuid/" element={<Dashboard />} >
              <Route index element={<Mainboard />} />
              <Route path="addMember" element={<Mainboard />} />
              <Route path="addEmployee" element={<Mainboard />} />
              <Route path="membersList" element={<Mainboard />} />
              <Route path="employeeList" element={<Mainboard />} />
              <Route path="accountSettings" element={<Mainboard />} />
            </Route>
          </Route>
          <Route path="/reportBug" element={<Gate />}/>
          <Route path="/logout" element={<Gate />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
