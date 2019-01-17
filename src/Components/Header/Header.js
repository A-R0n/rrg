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

  getDefaultProps = () => {
    return {
      width: '50',
      height: '50',
      style_one: 'enable-background:new 0 0 512 512;',
      style_two: '#B06328;',
      style_three: "#B0C4D8;",
      style_four: "#99B4CD;",
      style_five: "#C4D7E5;",
      style_six: "#70B7E5;",
      style_seven: "#92C5EB;",
      style_eight: "#4C9CD6;",
      style_nine: "#B0C9DB;",
      style_ten: "#E2E7F0;",
      style_eleven: "#A35425;",
      style_twelve: "#C97629;"

    };
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
