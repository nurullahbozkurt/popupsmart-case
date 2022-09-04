import { useNavigate } from "react-router-dom";

import { useApp } from "../states/app";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { localUsername } = useApp();

  if (localUsername === null) {
    return navigate("/");
  }

  return children;
};

ProtectedRoute.defaultProps = {
  exact: false,
  children: null,
};

export default ProtectedRoute;
