import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { HeaderBarProps } from '../../types';

const HeaderBar: React.FC<HeaderBarProps> = ({ title, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="logout"
          onClick={onLogout}
          edge="end"
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
