import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserConnected } from "../redux/UserReducer";

const RoutesAuth = () => {
  const dispatch = useDispatch()
  // Get user connection state from Redux store
  const isUserConnectedState = useSelector((state) => state.UserReducer.isUserConnected);

  // Retrieve user access status from localStorage and convert to boolean
  const isAllowedAccess = localStorage.getItem("user_access_status") === 'true';
  if (!isUserConnectedState && isAllowedAccess) {
    dispatch(setUserConnected(true))
  }
  // Both Redux state and localStorage must be true to grant access
  const hasAccess = isAllowedAccess && isUserConnectedState;

  console.log('LocalStorage:', isAllowedAccess, 'Redux:', isUserConnectedState);

  // Return the correct component based on access rights
  return hasAccess ? <Outlet /> : <Navigate to="/gate" />;
};

export default RoutesAuth;
