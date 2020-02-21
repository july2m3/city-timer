import React from 'react';

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='timer-container'>
        <p className='timer-value'>25:00</p>
      </div>
    );
  }
}

export default TimerContainer;
