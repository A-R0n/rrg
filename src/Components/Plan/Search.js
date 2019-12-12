import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';
import { Link } from 'react-router-dom';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      allTheRoutes: [],
      routesIwantToClimb: [],
      routeNameString: '',
      isSelected: false
    };
  }

  componentDidMount() {
    axios.get('/api/routes').then(results => {
      this.setState({
        allTheRoutes: results.data
      });
    });
  }

  handleClick = id => {
    axios.post(`/api/test/${id}`).then(results => {
      this.setState({
        routesIwantToClimb: results.data,
        isSelected: !this.state.isSelected
      });
    });
  };

  handleChange = filter => {
    this.setState({
      routeNameString: filter
    });
  };

  render() {
    console.log(this.state)
    let { routeNameString } = this.state;

    let routeToDisplay = this.state.allTheRoutes
      .filter(elem => {
        return (
          elem.route_name.includes(routeNameString) ||
          elem.crag.includes(routeNameString) ||
          elem.route_grade.includes(routeNameString)
        );
      })
      .map((elem, index) => {
        return (
          <div
            key={index}
            className={
              this.state.routeNameString.length < 2
                ? 'routesNotSelected'
                : 'routesSelected'
            }
          >
            <img
              id={
                this.state.routeNameString.length < 2
                  ? 'routeImg'
                  : 'routeImgSelected'
              }
              src={elem.route_img}
              alt='route pic'
            />
            <button
              onClick={() => this.handleClick(elem.route_id)}
              className='addButt0n'
            >
              +
            </button>
            <div
              className={
                this.state.routeNameString.length < 2 ? 'text' : 'textSelected'
              }
            >
              <Link key={index} to={`/routes/${elem.route_name}`}>
                <p id='routeNameInSearch'>{elem.route_name}</p>
              </Link>
              <li id='grade'>Grade: {elem.route_grade} </li>
              <li id={elem.route_type === 'sport' ? 'sport' : 'trad'}>
                Type: {elem.route_type}
              </li>
              <li id='crag'>Crag: {elem.crag}</li>
              <li id='rating'>Rating: {elem.MP_rating}</li>
            </div>
          </div>
        );
      });

    return (
      <div className='allTheRoutes'>
        <div className='top_part'>
        
          <p id='lineOne'>
            Add route to Cart by clicking on the route image.
          </p>
          <p id='lineTwo'>Get reviews by clicking on the route name.</p>
          <div className='find_with_mag'>
          <img
            id='magGlass'
            src='https://www.shareicon.net/data/128x128/2016/01/10/701311_magnifying-glass_512x512.png'
            alt='classic routes'
          />
          <input
            id='find_route'
            onChange={e => this.handleChange(e.target.value)}
            type='text'
            placeholder='Search'
          />
          </div>
        </div>
        <div className='all_routes'>{routeToDisplay}</div>
      </div>
    );
  }
}
