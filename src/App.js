import React from 'react';
import TimerLengthControl from './TimerLengthControl';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerType: 'Session',
      timer: 1500,
      timerStatus: 'stopped',
      interval: null
    };
  }

  setBreakLength = event => {
    this.controlLength('breakLength', 
      event.target.value, 'Session', this.state.breakLength);
  }

  setSessionLength = event => {
    this.controlLength('sessionLength',
      event.target.value, 'Break', this.state.sessionLength);
  }

  controlLength = (stateToChange, sign, timerType, currentLength) => {
    if (this.state.timerStatus === 'running') {
      return;
    }
    if (this.state.timerType === timerType) {
      if (sign === '-' && currentLength !== 1) {
        this.setState({
          [stateToChange]: currentLength - 1
        });
      } else if (sign === '+' && currentLength !== 60) {
        this.setState({
          [stateToChange]: currentLength + 1
        });
      }
    } else {
      if (sign === '-' && currentLength !== 1) {
        this.setState({
          [stateToChange]: currentLength - 1,
          timer: 60 * (currentLength - 1)
        });
      } else if (sign === '+' && currentLength !== 60) {
        this.setState({
          [stateToChange]: currentLength + 1,
          timer: 60 * (currentLength + 1)
        });
      }
    }
  }

  controlTimer = () => {
    if (this.state.timer === 0) {
      this.beep.play();
      let timerType = this.state.timerType === "Break" ? 
        "Session": "Break";
      let timer = this.state.timerType === "Break" ? 
        this.state.sessionLength * 60: this.state.breakLength * 60;
      this.setState({
        timerType,
        timer
      });
    } else {
      this.setState({
        timer: this.state.timer - 1
      });
    }
  }

  countDown = () => {
    if (this.state.timerStatus === 'stopped') {
      this.setState({
        timerStatus: 'running',
        interval: setInterval(this.controlTimer, 1000)
      });
    } else {
      this.setState({
        timerStatus: 'stopped',
        interval: clearInterval(this.state.interval)
      });
    }
  }

  clockify = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  reset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerType: 'Session',
      timer: 1500,
      timerStatus: 'stopped',
      interval: clearInterval(this.state.interval)
    });
    
    this.beep.pause();
    this.beep.currentTime = 0;
  }

  render() {
    return (
      <div className="App">
        <div className="main-title">Pomodoro Clock</div>
        <TimerLengthControl 
        titleID="break-label"
        minID="break-decrement"
        addID="break-increment"
        lengthID="break-length"
        title="Break Length"    onClick={this.setBreakLength}
        length={this.state.breakLength} />
        <TimerLengthControl 
        titleID="session-label"
        minID="session-decrement"
        addID="session-increment"
        lengthID="session-length"
        title="Session Length"    onClick={this.setSessionLength}
        length={this.state.sessionLength} />
        <div className="timer">
          <div className="timer-wrapper">
            <div id='timer-label'>
              {this.state.timerType}
            </div>
            <div id='time-left'>
              {this.clockify()}
            </div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={this.countDown}>
            <i class="fas fa-play fa-2x"></i>
            <i class="fas fa-pause fa-2x"></i>
          </button>
          <button id="reset" onClick={this.reset}>
            <i class="fas fa-sync-alt fa-2x"></i>
          </button>
        </div>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.beep = audio; }} />
      </div>
    );
  }
}

export default App;
