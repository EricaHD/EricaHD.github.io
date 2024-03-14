import React, { Component } from 'react';
import Typography from '@mui/material/Typography';

class Header extends Component {
  render() {
    return (
      <div>
        <Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
          Retirement Contribution Calculator
        </Typography>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
          with a 2% per-paycheck match from your company
        </Typography>
      </div>
    );
  }
}

export default Header;
