import React from 'react';

import './style.css';
import soundFile from './resources/gong.mp3';

import Menu from './components/Menu';
import TimerContainer from './components/TimerContainer';
import TimerButton from './components/TimerButton';

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

  componentDidMount() {
    this.updatePageTitle();
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

  playSound = () => {
    let audio = document.querySelector('audio');

    audio.play();
  };

  render() {
    return (
      <>
        {/* "Wind Chime, Gamelan Gong, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org */}
        <audio src={soundFile} />

        <TimerContainer time={this.getTimerValue()} />
        <TimerButton onClick={this.timerButton} value={this.state.timerValue} />
        <Menu>
          <p onClick={this.playSound} className="play">
            <i className="fas fa-play"></i>
          </p>
        </Menu>
      </>
    );
  }
}

export default CityTimerApp;
