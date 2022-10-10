import React, { Component } from "react";
import background from "../images/banner.jpg";

class Header extends Component {
  render() {
    const body = `
      <section id="banner">
        <div class="inner">
          <div id="title_container"></div>
          <p>Software Engineer<br/>New York, NY</p>
          <ul class="icons">
            <li>
              <a href="https://www.linkedin.com/in/ericahd" class="icon fa-linkedin">
                <span class="label">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="mailto:erica.h.dominic@gmail.com" class="icon fa-envelope-o">
                <span class="label">Email</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/EricaHD" class="icon fa-github">
                <span class="label">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
        <a href="#one" class="more scrolly"></a>
      </section>
    `;
    const myStyle={
      backgroundImage: `url(${background})`,
      height: '100vh',
      width: '100vh',
      backgroundRepeat: 'no-repeat',
    };
    return (<div dangerouslySetInnerHTML={{__html: body}} style={myStyle} />);
  }
}

export default Header;
