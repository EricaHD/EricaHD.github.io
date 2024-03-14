import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import styles from './Header.styles';

class Header extends Component {
  render() {
    return (
      <div>
        <Typography variant="h3" sx={styles.title}>
          Retirement Contribution Calculator
        </Typography>
        <Typography variant="h6" sx={styles.subtitle}>
          with a 2% per-paycheck match from your company
        </Typography>
      </div>
    );
  }
}

export default Header;
