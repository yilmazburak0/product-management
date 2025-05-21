import React, { useState } from 'react';
import { login } from '../../utils/auth';
import styles from './Login.module.css';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import { LoginProps } from '../../types';

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const isValid = login(username, password);

    if (isValid) {
      localStorage.setItem('isAuthenticated', 'true');
      
      setUsername('');
      setPassword('');
      setError('');
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box className={styles.loginContainer}>
      <Paper elevation={3} className={styles.loginForm}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login to Product Management
        </Typography>
        
        {error && (
          <Alert severity="error" className={styles.alert}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            placeholder='admin'
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder='123456'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.submitButton}
            size="large"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;