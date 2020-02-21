import React from 'react';

class Currency extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='currency'>
        <p>
          <i class='fas fa-coins'></i> 0
        </p>
      </div>
    );
  }
}
export default Currency;
