import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user_image: null,
      user: {}
    };
  }

  componentDidMount() {
    axios.get(`/api/user`).then(results => {
      if (results.data.passport) {
        this.setState({
          user_image: results.data.passport.user.image_url
        });
      }
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className='header'>
        <h1 id='rrg_climb'>RRG Climb</h1>
        <div className='rightSideOfHeader'>
          <Link to='/'>
            <img
              className='homebutton'
              src='https://image.flaticon.com/icons/svg/609/609803.svg'
            />
          </Link>
          <Link to='/plan'>
            <img
              className='searchbutton'
              src='https://image.flaticon.com/icons/svg/167/167500.svg'
            />
          </Link>
          <Link to='/journal'>
            <img
              className='journalbutton'
              src='https://image.flaticon.com/icons/svg/1088/1088149.svg'
            />
          </Link>
          <Link to='/profile'>
            <img
              className='profilebutton'
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
