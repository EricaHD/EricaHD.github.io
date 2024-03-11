import React, { Component } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import Button from '@mui/material/Button';

class Header extends Component {
  render() {
    return (
      <div>
        <Button variant="contained">Hello world</Button>
        <p>Sorry you cannot view my personal website at this time!</p>
        <p>I am borrowing this page temporarily for a hackathon project.</p>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          width={500}
          height={300}
        />
      </div>
    );
  }
}

export default Header;
