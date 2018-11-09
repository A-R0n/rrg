import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';




export default class Home extends Component {
    constructor(){
        super();

        this.state = {
            corrd: [],
            routes: []
        }
        
    }
    componentDidMount() {
        axios.get('/api/weather').then(results => {
          this.setState({
            corrd: results.data.weather,
            displayWeather: !this.state.displayWeather
          })
        })
      }


    render(){
        const {corrd} = this.state
        let mapWeather = corrd.map((val) => {
            return <div>
            <img className='currentWeatherMiddle'src={val.image} alt='text'></img>
            </div>
          })
        
        return (
            <div>
            <div className='homeImg'>
            {mapWeather}
            <img  className="michaela" src='https://www.nationalgeographic.com/content/dam/expeditions/destinations/north-america/private/Yosemite/Hero-Yosemite.ngsversion.1524840074980.adapt.1900.1.jpg' alt='text'></img>
            <a id='login' href={`${process.env.REACT_APP_SERVER}/login`}>Login</a>
            <a id='logout' href={`${process.env.REACT_APP_SERVER}/logout`}>Logout</a>
            </div>
            </div>
        )
    }
}