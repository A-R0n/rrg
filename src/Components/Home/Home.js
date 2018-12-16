import React, { Component } from 'react';
import './Home.css';
// import axios from 'axios';



export default class Home extends Component {
    constructor(){
        super();

        this.state = {
            corrd: [],
            tempInF: [],
            tempInC: [],
            tempIsInC: false
        }
        
    }
    // componentDidMount() {
    //     axios.get('/api/weather').then(results => {
    //       this.setState({
    //         corrd: results.data.weather,
    //         tempInC: results.data.main.temp,
    //         tempInF: results.data.main.temp * (9/5) + 32
    //       })
    //       console.log(this.state)
    //     })
    //   }

      handleClick = () => {
          this.setState({
              tempIsInC: !this.state.tempIsInC
          })
      }

      


    render(){
        const {corrd, tempInF, tempInC, tempIsInC} = this.state
        let mapWeather = corrd.map((val) => {
            return <div className='currentWeather'>
            <img id='pic' src={val.image} alt='current weather icon'></img>
            <div id={tempIsInC === true ? 'noTemp' : 'temp'}>{Math.round(tempInF)}°F</div>
            <div id='temp2'>{Math.round(tempInC)}°C</div>
            <button id={'convertTemp'} onClick={this.handleClick}>Convert </button>
            </div>
          })

        
        
        return (
            <div className='home'>
            <div className='homeImg'>
            {mapWeather}
            </div>
            <img  className="noPlaceLikeHome" src='https://static1.squarespace.com/static/51f68fe5e4b01da70d04b6eb/5419e4e9e4b0ca2f107f5ccc/5a64acc20d92971507930352/1531519018763/rrg-aerials-0095-web.jpg' alt='No Place Like Home'></img>
            <a id='login' href={`${process.env.REACT_APP_SERVER}/login`}>Login</a>
            <a id='logout' href={`${process.env.REACT_APP_SERVER}/logout`}>Logout</a>
            </div>
        )
    }
}