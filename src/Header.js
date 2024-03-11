import React, { Component } from "react";
import Button from '@mui/material/Button';

class Header extends Component {
  render() {
    return (
      <div>
        <Button variant="contained">Hello world</Button>
        <p>Sorry you cannot view my personal website at this time!</p>
        <p>I am borrowing this page temporarily for a hackathon project.</p>
      </div>
    );
  }
}

export default Header;
