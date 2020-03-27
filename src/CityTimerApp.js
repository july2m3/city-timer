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
      timer: null,
      timerValue: 'start',
    };
  }

  timerButton = () => {
    let timer;
    if (!this.state.timerIsOn) {
      timer = setInterval(this.subTractTime, 1000);
      this.setState(() => ({ timer }));
      this.setState(() => ({ timerValue: 'stop' }));
    } else {
      clearInterval(this.state.timer);
      this.setState(() => ({ timerValue: 'start' }));
    }

    this.setState(state => ({
      timerIsOn: !state.timerIsOn,
    }));
  };

  updatePageTitle = () => {
    document.title = this.getTimerValue();
  };

  subTractTime = () => {
    this.setState(state => ({ timerSeconds: state.timerSeconds - 1 }));
    if (this.state.timerSeconds < 0) {
      this.setState(() => ({ timerSeconds: 59 }));
      this.setState(state => ({ timerMinutes: state.timerMinutes - 1 }));
    }
    this.updatePageTitle();
  };

  getTimerValue = () => {
    let seconds = this.state.timerSeconds;
    let minutes = this.state.timerMinutes;

    let s = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
    let m = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    return m + ':' + s;
  };

  render() {
    return (
      <>
        <div className="top">
          <OptionToggle />
          <Currency />
        </div>
        <CityContainer />
        <TimerContainer time={this.getTimerValue()} />
        <TimerButton onClick={this.timerButton} value={this.state.timerValue} />
      </>
    );
  }
}

export default CityTimerApp;
