import React, { useState, useEffect } from "react";
import ProductManagementPage from "./pages/ProductManagement/ProductManagement";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    setIsAuthChecked(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthChecked) {
    return null;
  }

  return isAuthenticated ? (
    <ProductManagementPage onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default App;
