import { Navigate, Outlet } from "react-router-dom";

const RoutesAuth = () => {
  // Retrieve user access status from localStorage
  let isAllowedAccess = localStorage.getItem("user_access_status");

  // Default to "false" if the item does not exist
  isAllowedAccess = isAllowedAccess ? isAllowedAccess : "false";

  // Check if access is allowed and render appropriate component
  return isAllowedAccess === "true" ? <Outlet /> : <Navigate to="/gate" />;
};

export default RoutesAuth;
