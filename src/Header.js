import React, { Component } from "react";
import background from "../images/banner.jpg";
import "../css/Header.css";

class Header extends Component {
  render() {
    const myStyle={
      backgroundImage: `url(${background})`,
      height: '100vh',
      width: '100vh',
      margin: '0',
      padding: '0',
      backgroundRepeat: 'no-repeat',
    };
    return (
      <div id="banner" style={myStyle}>
        <div className="inner">
          <h2>Erica Dominic</h2>
          <p>Software Engineer<br/>New York, NY</p>
          <ul className="icons">
            <li>
              <a href="https://www.linkedin.com/in/ericahd" className="icon fa-linkedin">
                <span className="label">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="mailto:erica.h.dominic@gmail.com" className="icon fa-envelope-o">
                <span className="label">Email</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/EricaHD" className="icon fa-github">
                <span className="label">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
        <a href="#one" className="more scrolly"></a>
      </div>
     );
  }
}

export default Header;
