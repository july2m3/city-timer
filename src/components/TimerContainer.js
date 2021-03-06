import React from 'react';

// const showTime = (minutes = 10, seconds = 11) => {
//   let s = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
//   let m = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
//   return m + ':' + s;
// };

const TimerContainer = ({ time }) => {
  return (
    <div className="timer-container">
      {/* <p className='timer-value'>{props.seconds.toS}</p> */}
      <p className="timer-value">{time}</p>
    </div>
  );
};

export default TimerContainer;
