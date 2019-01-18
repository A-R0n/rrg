import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      name_of_weather: [],
      tempInF: [],
      tempInC: [],
      tempIsInC: false
    };
  }
  componentDidMount() {
    axios.get('/api/weather').then(results => {
      this.setState({
        name_of_weather: results.data.weather[0].image,
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
    const { name_of_weather, tempInF, tempInC, tempIsInC } = this.state;
    return (
      <div className='home'>
        <div className='home_information'>
          <div className='weather_box'>
          <div className='currentWeather'>
          <img id='pic' src={name_of_weather} alt='current weather icon' />
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
          </div>
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
