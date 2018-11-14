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
            <img  className="michaela" src='https://static1.squarespace.com/static/51f68fe5e4b01da70d04b6eb/5419e4e9e4b0ca2f107f5ccc/5a64acc20d92971507930352/1531519018763/rrg-aerials-0095-web.jpg' ></img>
            <a id='login' href={`${process.env.REACT_APP_SERVER}/login`}>Login</a>
            <a id='logout' href={`${process.env.REACT_APP_SERVER}/logout`}>Logout</a>
            </div>
            </div>
        )
    }
}