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
            <img  className="michaela" src='https://outdoorgearlab-mvnab3pwrvp3t0.stackpathdns.com/photos/15/81/279616_31645_L2.jpg' alt='text'></img>
            <a id='login' href={`${process.env.REACT_APP_SERVER}/login`}>Login</a>
            <a id='logout' href={`${process.env.REACT_APP_SERVER}/logout`}>Logout</a>
            </div>
            </div>
        )
    }
}