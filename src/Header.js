import React, { Component } from 'react';
import Typography from '@mui/material/Typography';

class Header extends Component {
  render() {
    return (
      <div>
        <Typography variant="h3" sx={{ textAlign: 'center', backgroundColor: '#e8e4e3', paddingTop: 2 }}>
          Retirement Contribution Calculator
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', backgroundColor: '#e8e4e3', paddingBottom: 3, marginBottom: 3 }}>
          with a 2% per-paycheck match from your company
        </Typography>
      </div>
    );
  }
}

export default Header;
