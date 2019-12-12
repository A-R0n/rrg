import React, { Component } from 'react';
import './Profile.css';
import RouteLog from '../RouteLog/RouteLog.js';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  updateUserName,
  updateBiography,
  updateLocation,
  updateProfile,
  update_profile_2
} from '../../redux/reducer';
import Upload from '../Upload.js';
import WorldMap from '../WorldMap/WorldMap.js';
// import {SketchField, Tools} from 'react-sketch';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      routelog: [],
      userroutelog: '',
      loc: '',
      name: '',
      bio: '',
      user_exists: false,
      new_info_has_been_submitted: false,
      user: {}
    };
  }
  componentDidMount() {
    this.get_user_route_log();
    this.get_user_personal_info();
  }

  get_user_route_log = () => {
    axios.get('/api/table').then(results => {
      this.setState({
        routelog: results.data,
        userroutelog: results.data.id
      });
    });
  };

  get_user_personal_info = () => {
    axios.get(`/api/user`).then(results => {
      if(results.data.passport) {
      this.setState({
        user_exists: true,
        loc: results.data.passport.user.location_,
        name: results.data.passport.user.username,
        bio: results.data.passport.user.biography
      });
    }});
  
  };

  edit_profile = () => {
    this.setState({ user_exists: !this.state.user_exists });
  };

  changeHandler = (e, name) => {
    this.setState({ [name]: e.target.value });
    console.log(e.target.value);
  };



  update_profile_info = () => {
    this.props.update_profile_2(this.props)
    .then(
      this.setState({
        user: Object.assign({}, this.state.user, { location_: this.props.location, biography: this.props.biography, username: this.props.userName }),
        user_exists: true
      })
    );
  }

  render() {
    console.log('props', this.props);
    let anotherMap = this.state.routelog.map((elem, i) => {
      return (
        <RouteLog
          key={i}
          route_name={elem.route_name}
          description_={elem.description_}
          timestamp_={moment(elem.time_stamp).calendar()}
          sent={elem.sent_}
          picture_of_route={elem.picture_of_route}
        />
      );
    });
    const {
      updateUserName,
      updateBiography,
      updateLocation,
      update_profile_2
    } = this.props;
    return (
      <div className='entireProfile'>
        <div className='topHalf'>
          <Upload />
          
          <div
            className={
              !this.state.user_exists
                ? 'whatTheUserFillsIn'
                : 'whatTheUserWontSee'
            }
          >
            <textarea
              className='userName'
              placeholder='User Name'
              onChange={e => updateUserName(e.target.value)}
            />
            <textarea
              className='location'
              placeholder='Location'
              onChange={e => updateLocation(e.target.value)}
            />
            <textarea
              className='biography'
              placeholder='Biography'
              onChange={e => updateBiography(e.target.value)}
            />

            <button
              className='submitProfile'
              onClick={() => this.update_profile_info()}
            >
              submit
            </button>
          </div>
          <div
            className={
              this.state.user_exists
                ? 'nombre_and_location'
                : 'whatTheUserWontSee'
            }
          >
            <div
              className={
                this.state.user_exists ? 'nombre' : 'whatTheUserWontSee'
              }
            >
              {this.props.userName || this.state.user.username}
            </div>
            <div className={'location_info'}>
              <img
                className='user_loc_icon'
                src='https://www.flaticon.com/premium-icon/icons/svg/450/450016.svg'
                alt='pin'
              />
              <div className='user_loc'>{this.props.location || this.state.loc}</div>
              <div className='el_bio'>"{this.props.biography || this.state.bio}"</div>
            </div>
          </div>
          <button id='edit_profile' onClick={() => this.edit_profile()}>
            Edit
          </button>
        </div>
        <div className='bottomHalf'>
        <WorldMap />
          <div className='allJournalEntries'>{anotherMap}</div>
          <div className='allMedia' />
          <div className='allSends' />
          <div className='allProjects' />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userName, biography, location } = state;

  return {
    userName,
    biography,
    location
  };
}

export default connect(
  mapStateToProps,
  { updateUserName, updateBiography, updateLocation,  update_profile_2 }
)(Profile);
