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
      iNeedToBringInRedux: []
    };
  }
  componentDidMount() {
    axios.get('/api/table').then(results => {
      this.setState({
        iNeedToBringInRedux: results.data
      });
    });
  }

  render() {
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
    // console.log(this.props.match.params);
    // console.log(this.state);
    return (
      <div className='entireProfile'>
        <div className='topHalf'>
          <Upload />
          <div className='whatTheUserFillsIn'>
            <textarea
              className='userName'
              placeholder='User Name'
              onChange={e => updateUserName(e.target.value)}
            />
            <textarea
              className='biography'
              placeholder='Biography'
              onChange={e => updateBiography(e.target.value)}
            />
            <textarea
              className='location'
              placeholder='Location'
              onChange={e => updateLocation(e.target.value)}
            />
            <button
              className='makeProfile'
              onClick={() => updateProfile(this.props)}
            >
              submit
            </button>
          </div>
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
