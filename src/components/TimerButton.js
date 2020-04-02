import React from 'react';

const TimerButton = ({ onClick, value }) => {
  return (
    <button onClick={onClick} className="timer-button">
      {value}
    </button>
  );
};

export default TimerButton;
