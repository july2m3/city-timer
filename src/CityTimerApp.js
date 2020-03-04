import React from 'react';
import './style.css';
import OptionToggle from './Components/OptionToggle';
import Currency from './Components/Currency';
import CityContainer from './Components/CityContainer';
import TimerContainer from './Components/TimerContainer';
import TimerButton from './Components/TimerButton';

class CityTimerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerMinutes: 25,
      timerSeconds: 0,
      timerIsOn: false,
    };
  }

  timerButton = () => {
    console.log('button pushed');
    this.setState(state => ({
      timerIsOn: !state.timerIsOn,
    }));
  };

  ShowTime = () => {
    let seconds = '';
    // return '25:00';
    if (this.timerSeconds < 10) {
      seconds = `0${this.timerSeconds}`;
    }

    console.log(seconds);
    // return `${this.timerMinutes}:${seconds}`;
    return seconds;
  };

  render() {
    return (
      <>
        <div className='top'>
          <OptionToggle />
          <Currency />
        </div>
        <CityContainer />
        <TimerContainer
          minutes={this.state.timerMinutes}
          seconds={this.state.timerSeconds}
        />
        <TimerButton onClick={this.timerButton} />
      </>
    );
  }
}

export default CityTimerApp;
