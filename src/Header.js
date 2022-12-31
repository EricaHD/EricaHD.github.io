import React, { Component } from "react";
import background from "../images/banner.jpg";
import "../css/Header.css";

class Header extends Component {
  render() {
    const backgroundStyle = {
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div id="banner" style={backgroundStyle}>
        <div className="inner">
          <h2>Erica Dominic</h2>
          <p>Software Engineer<br/>New York, NY</p>
          <ul className="icons">
            <li>
              <a href="https://www.linkedin.com/in/ericahd" className="icon">
                <svg width="24" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#ffffff" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="mailto:erica.h.dominic@gmail.com" className="icon">
                <svg width="30" height="30" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#ffffff" d="m55.5 18.8-1.9-1.9L36 34.5c-2.2 2.2-5.9 2.2-8.1 0L10.3 17l-1.9 1.9L21.5 32 8.4 45.1l1.9 1.9 13.1-13.1 2.6 2.6c1.6 1.6 3.7 2.5 5.9 2.5s4.3-.9 5.9-2.5l2.6-2.6L53.5 47l1.9-1.9L42.3 32l13.2-13.2" transform="scale(1)"/>
                  <path fill="#ffffff" d="M51.8 50.4H12.3c-2.3 0-4.2-1.9-4.2-4.2V18c0-2.3 1.9-4.2 4.2-4.2h39.5c2.3 0 4.2 1.9 4.2 4.2v28.2c0 2.3-1.9 4.2-4.2 4.2zM12.2 16.5c-.8 0-1.4.6-1.4 1.4v28.2c0 .8.6 1.4 1.4 1.4h39.5c.8 0 1.4-.6 1.4-1.4V17.9c0-.8-.6-1.4-1.4-1.4H12.2z" transform="scale(1)"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://github.com/EricaHD" className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#ffffff" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(1.5)"/>
                </svg>
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
