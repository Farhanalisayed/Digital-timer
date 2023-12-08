// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: 25,
    minute: 25,
    seconds: 0,
    isTimerOn: false,
  }

  tickTock = () => {
    const {minute, seconds, timer} = this.state
    if (minute === 0 && seconds === 0) {
      clearInterval(this.timerID)
      this.setState({
        timer: 25,
        minute: 25,
        seconds: 0,
        isTimerOn: false,
      })
    } else if (seconds === 0) {
      this.setState(prevVal => ({
        minute: prevVal.minute - 1,
        seconds: 59,
      }))
    } else {
      this.setState(prevVal => ({seconds: prevVal.seconds - 1}))
    }
  }

  onClicked = () => {
    const {isTimerOn} = this.state
    if (isTimerOn === true) {
      this.setState({isTimerOn: false})
      clearInterval(this.timerID)
    } else {
      this.setState({isTimerOn: true})
      this.timerID = setInterval(this.tickTock, 1000)
    }
  }

  onReset = () => {
    clearInterval(this.timerID)
    this.setState({
      timer: 25,
      minute: 25,
      seconds: 0,
      isTimerOn: false,
    })
  }

  setTime = () => {}

  onDecrement = () => {
    const {isTimerOn, timer} = this.state
    this.setState(prevVal => ({timer: prevVal.timer - 1}))
    if (isTimerOn === false) {
      this.setState(prevVal => ({minute: prevVal.minute - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevVal => ({timer: prevVal.timer + 1}))
    if (isTimerOn === false) {
      this.setState(prevVal => ({minute: prevVal.minute + 1}))
    }
  }

  render() {
    const {minute, seconds, timer, isTimerOn} = this.state
    const minText = minute < 10 ? `0${minute}` : minute
    const secText = seconds < 10 ? `0${seconds}` : seconds
    const status = isTimerOn ? 'Running' : 'Paused'
    const imgUrl = isTimerOn
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerOn ? 'pause icon' : 'play icon'
    const tagText = isTimerOn ? 'Pause' : 'Start'

    return (
      <div className="the-container">
        <h1 className="heading">Digital Timer</h1>

        <div className="timer-container-elem">
          <div className="timer-cont">
            <div className="timer">
              <h1 className="time">
                {minText}:{secText}
              </h1>
              <p className="status">{status}</p>
            </div>
          </div>

          <div className="text-container">
            <div className="btn-container">
                <button className="btn" onClick={this.onClicked} type="button">
                  <img className="image" src={imgUrl} alt={altText} />

                  <p className="tag">{tagText}</p>
                </button>

                <button className="btn" onClick={this.onReset} type="button">
                  <img
                    className="image"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />

                  <p className="tag">Reset</p>
                </button>
            </div>

            <p className="note">Set Timer limit</p>

            <div className="time-setter">
              <button
                className="decreaser"
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="set-time">{timer}</p>
              <button
                className="increaser"
                type="button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
