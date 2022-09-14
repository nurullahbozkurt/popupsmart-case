import { Navigate } from "react-router-dom";

import { useApp } from "../states/app";

const ProtectedRoute = ({ children }) => {
  const { localUsername } = useApp();

  // The user cannot use the application without logging in.
  // if localUsername is false, redirect to login page
  if (
    !Boolean(localUsername) ||
    !Boolean(window.localStorage.getItem("username"))
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.defaultProps = {
  exact: false,
  children: null,
};

export default ProtectedRoute;
