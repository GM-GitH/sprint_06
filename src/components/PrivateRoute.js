import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ user, children }) => {
  const { auth } = useContext(AuthContext);
  if (user || localStorage.getItem("isLogin") || {auth} === true) {
    return children ? children : <Outlet />;
  } else return <Navigate to="/login" />;
};

export default PrivateRoute;
