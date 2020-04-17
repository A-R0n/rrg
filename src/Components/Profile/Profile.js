import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import {
setUser
} from '../../redux/reducer';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
userInfo: {
  id: 1
}
    };
  }
  componentDidMount() {
    axios.get(`/api/climber/${this.props.match.params.id}`).then(results => {
      console.log("results data passport: ", results.data);
      if(results.data.passport) {
      this.setState({
        userInfo: results.data
      })
    }});
  }

  render() {
console.log(this.state);
    return (
      <div className='entireProfile'>
<div>{this.state.userInfo.id}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
user
  };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Profile);
