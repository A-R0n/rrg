import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      corrd: [],
      tempInF: [],
      tempInC: [],
      tempIsInC: false
    };
  }
  componentDidMount() {
    axios.get('/api/weather').then(results => {
      this.setState({
        corrd: results.data.weather,
        tempInC: results.data.main.temp,
        tempInF: results.data.main.temp * (9 / 5) + 32
      });
    });
  }

  handleClick = () => {
    this.setState({
      tempIsInC: !this.state.tempIsInC
    });
  };

  render() {
    const { corrd, tempInF, tempInC, tempIsInC } = this.state;
    let mapWeather = corrd.map(val => {
      return (
        <div className='currentWeather'>
          <img id='pic' src={val.image} alt='current weather icon' />
          <div className='temp_and_button'>
            <div
              id={
                tempIsInC === true
                  ? 'dont_display_farenheit'
                  : 'display_farenheit'
              }
            >
              {Math.round(tempInF)}°F
            </div>
            <div
              id={
                tempIsInC === true ? 'display_celcius' : 'dont_dislay_celcius'
              }
            >
              {Math.round(tempInC)}°C
            </div>
            <button id={'convertTemp'} onClick={this.handleClick}>
              Convert{' '}
            </button>
          </div>
        </div>
      );
    });

    return (
      <div className='home'>
        <div className='home_information'>
          <div className='weather_box'>{mapWeather}</div>
          <div className='login_logout'>
            <a id='login' href={`${process.env.REACT_APP_SERVER}/login`}>
              Login
            </a>
            <a id='logout' href={`${process.env.REACT_APP_SERVER}/logout`}>
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  }
}
