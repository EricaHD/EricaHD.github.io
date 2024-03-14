import React, { Component } from 'react';
import Chart from './Chart';
import Typography from '@mui/material/Typography';

class App extends Component {
  render() {
    return (
      <div>
        <Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
          Retirement Contribution Calculator
        </Typography>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
          with a 2% per-paycheck match from your company
        </Typography>
        <Chart />
      </div>
    );
  }
}

export default App;
