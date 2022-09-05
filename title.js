'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
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
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));