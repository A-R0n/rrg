import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addImage, updateProfile } from '../../redux/reducer';
import Upload from '../Upload.js';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      number: ''
    };
  }
  componentDidMount() {
    axios.get('/api/user').then(res => {
        res.data.passport.user &&
        this.setState({
          user: res.data.passport.user
        });
    });
  }

  render() {
      console.log(this.props)
    return (
      <div className='header'>
        <h1 id='rrg_climb'>{this.props.title}</h1>
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
            <img className='profilebutton' src={this.state.user.image_url || 'https://image.flaticon.com/icons/svg/149/149072.svg'}></img>
            {/* <Upload /> */}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { addImage, updateProfile }
)(Header);

