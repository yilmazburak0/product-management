import React from 'react';
import Login from '../../components/Login/Login';
import { LoginPageProps } from '../../types';


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleLoginSuccess = () => {
    onLogin();
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;