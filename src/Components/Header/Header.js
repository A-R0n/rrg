import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user_image: null,
    };
  }

  async componentDidMount () {
    await axios.get(`/api/user`).then(results => {
      if (results.data.passport) {
        this.setState({user_image: results.data.passport.user.image_url});
      } 
    });
  }

  render() {
    return (
      <div className='header'>
        <Link to='/'>
          <h1 id='rrg_climb'>RRG Climb</h1>
        </Link>
        <div className='rightSideOfHeader'>
          <Link to='/plan'>
          <img src='https://image.flaticon.com/icons/svg/214/214340.svg' className='searchbutton' alt='magglass'></img>
          </Link>
          <Link to='/journal'>
            <img
              className='journalbutton'
              src='https://image.flaticon.com/icons/svg/1088/1088149.svg'
              alt='journal'
            />
          </Link>
          <Link to='/profile'>
            <img
              className='profilebutton'
              alt='profile'
              src={
                this.state.user_image ||
                'https://image.flaticon.com/icons/svg/149/149072.svg'
              }
            />
          </Link>
        </div>
      </div>
    );
  }
}
