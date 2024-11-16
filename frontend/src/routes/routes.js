import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ChatPage from "../pages/ChatPage";
import NotFound from "../pages/NotFound";

const AppRoutes = ({ address, userData, handleLogin, handleLogout }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthPage
              address={address}
              userData={userData}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          }
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
