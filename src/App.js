import React from 'react';
import ReactNotifications from 'react-browser-notifications';

import './style.css';
import soundFile from './resources/gong.mp3';
import bgLight from './resources/mountains.jpg';
import bgDark from './resources/dark.jpeg';

import Menu from './components/Menu';
import TimerContainer from './components/TimerContainer';
import TimerButton from './components/TimerButton';

class CityTimerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerMinutes: 0,
      timerSeconds: 2,
      timerIsOn: false,
      timer: null,
      timerValue: 'start',
      darkModeOn: false,
    };
  }

  componentDidMount() {
    this.updatePageTitle();
    this.switchTheme();
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

    // < 1 is so timer doesn't go into negatives
    if (this.state.timerSeconds < 1) {
      if (this.state.timerMinutes <= 0) {
        this.playSound();
        this.timerButton();
        this.showNotifications();
      } else {
        this.setState(() => ({ timerSeconds: 59 }));
        this.setState(state => ({ timerMinutes: state.timerMinutes - 1 }));
      }
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

  resetTimerSmall = () => {
    this.setState(() => ({ timerMinutes: 25 }));
    this.setState(() => ({ timerSeconds: 0 }));
  };

  resetTimerBig = () => {
    this.setState(() => ({ timerMinutes: 45 }));
    this.setState(() => ({ timerSeconds: 0 }));
  };

  switchTheme = () => {
    let dark = '#333';
    let light = '#fff';
    let body = document.querySelector('body');

    this.setState(state => ({ darkModeOn: !this.state.darkModeOn }));

    if (!this.state.darkModeOn) {
      document.documentElement.style.setProperty('--main-color', light);
      document.documentElement.style.setProperty('--main-bg-color', dark);
      body.style = `background: url(${bgDark})`;
    } else {
      document.documentElement.style.setProperty('--main-color', dark);
      document.documentElement.style.setProperty('--main-bg-color', light);
      body.style = `background: url(${bgLight})`;
      body.style = 'background-size: cover';
    }
  };

  teaTime = () => {
    this.setState(() => ({ timerMinutes: 1 }));
    this.setState(() => ({ timerSeconds: 30 }));
  };

  showNotifications = () => {
    if (this.n.supported()) this.n.show();
  };

  handleClick = event => {
    window.focus();
    this.n.close(event.target.tag);
  };

  notifyMe = () => {
    if (this.n.supported()) this.n.show();
  };

  render() {
    return (
      <>
        {/* "Wind Chime, Gamelan Gong, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org */}
        <audio src={soundFile} />
        <TimerContainer time={this.getTimerValue()} />
        <TimerButton onClick={this.timerButton} value={this.state.timerValue} />
        <Menu>
          <ul className="menu-list">
            <li onClick={this.teaTime} className="menu-icon">
              <i class="fas fa-mug-hot"></i>
            </li>
            <li onClick={this.resetTimerSmall}>25:00</li>
            <li onClick={this.resetTimerBig}>45:00</li>
            <li onClick={this.playSound} className="menu-icon">
              <i className="fas fa-play"></i>
            </li>
            <li onClick={this.switchTheme} className="menu-icon">
              <i className="fas fa-moon" />
            </li>
            <li className="menu-icon">
              <ReactNotifications
                onRef={ref => (this.n = ref)} // Required
                title="Take a break" // Required
                body="it is well deserved"
                icon="devices-logo.png"
                tag="abcdef"
                timeout="5000"
                onClick={event => this.handleClick(event)}
              />
              <i onClick={this.showNotifications} className="fas fa-bell" />
            </li>
          </ul>
        </Menu>
      </>
    );
  }
}

export default CityTimerApp;
