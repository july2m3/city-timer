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
      timer: 0,
    };
  }

  render() {
    return (
      <>
        <OptionToggle />
        <Currency />
        <CityContainer />
        <TimerContainer />
        <TimerButton />
      </>
    );
  }
}

export default CityTimerApp;
