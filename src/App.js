import React, { Component } from "react";
import "../css/App.css";

class App extends Component {
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
    return(
      <div className="App">
        <h1>Erica Dominic</h1>
        <div dangerouslySetInnerHTML={{__html: body}} />
        <i>This website is currently under construction; please check back later!</i>
      </div>
    );
  }
}

export default App;
