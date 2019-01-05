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
  updateProfile
} from '../../redux/reducer';
import Upload from '../Upload.js';
// import {SketchField, Tools} from 'react-sketch';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      iNeedToBringInRedux: [],
      loc: '',
      name: '',
      bio: '',
      user_exists: false
    };
  }
  componentDidMount() {
    axios.get('/api/table').then(results => {
      this.setState({
        iNeedToBringInRedux: results.data
      });
    });
    axios.get(`/api/user`).then(results => {
      this.setState({
        user_exists: true,
        loc: results.data.passport.user.location_,
        name: results.data.passport.user.username,
        bio: results.data.passport.user.biography
      });
    });
  }

  edit_profile = () => {
    this.setState({ user_exists: !this.state.user_exists });
  };

  update_profile_info = (id) => {
    console.log(id)
    // axios.put(`/api/username`)
}

  render() {
    console.log(this.state);
    let anotherMap = this.state.iNeedToBringInRedux.map((elem, i) => {
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
      updateProfile
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
              // onClick={() => update_profile_info()}
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
              {this.state.name}
            </div>
            <div className={'location_info'}>
              <img
                className='user_loc_icon'
                src='https://www.flaticon.com/premium-icon/icons/svg/450/450016.svg'
              />
              <div className='user_loc'>{this.state.loc}</div>
              <div className='el_bio'>"{this.state.bio}"</div>
            </div>
          </div>
          <button id='edit_profile' onClick={() => this.edit_profile()}>
            Edit
          </button>
        </div>
        <div className='bottomHalf'>
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
  { updateUserName, updateBiography, updateLocation, updateProfile }
)(Profile);
