import React from 'react';

const TimerButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='timer-button'>
      Start
    </button>
  );
};

export default TimerButton;
