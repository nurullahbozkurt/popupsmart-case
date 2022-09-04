import { Navigate } from "react-router-dom";

import { useApp } from "../states/app";

const ProtectedRoute = ({ children }) => {
  const { localUsername } = useApp();

  if (!Boolean(localUsername)) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.defaultProps = {
  exact: false,
  children: null,
};

export default ProtectedRoute;
