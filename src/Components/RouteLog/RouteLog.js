import React, { Component } from 'react';

export default class RouteLog extends Component {
  render() {
    return (
      <div className='individualRoute'>
        <div className='post_header'>
          <div className='checkmark_and_routename'>
            <p id={this.props.sent ? 'checkmark' : 'no_checkmark'}>✔</p>
            <p id='profileRouteName'>{this.props.route_name}</p>
          </div>
          <p id='profileRouteTimeStamp'>{this.props.timestamp_}</p>
          <div id='dropdown_arrow'>⌄</div>
        </div>
        <div className='description_and_route_pic'>
          <p id='profileRouteDescription'>{this.props.description_}</p>
          <div className='image_container'>
            <img
              id={this.props.picture_of_route ? 'smallPic' : 'no_smallPic'}
              src={this.props.picture_of_route}
              alt='pic of route'
            />
          </div>
        </div>
      </div>
    );
  }
}
