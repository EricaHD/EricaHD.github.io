'use strict';

const e = React.createElement;

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'h2',
      {},
      'Erica Dominic'
    );
  }
}

const domContainer = document.querySelector('#title_container');
ReactDOM.render(e(Title), domContainer);
