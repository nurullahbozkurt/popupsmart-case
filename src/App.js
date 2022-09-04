import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import TodoApp from "./pages/TodoApp";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <TodoApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
