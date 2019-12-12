import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import './RouteIWantToClimb.css';
require('dotenv').config();

export default class RouteIwantToClimb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true,
      description: '',
      rating: 0,
      user: {},
      myCart: [],
      user_climbing_image: null
    };
  }

  componentDidMount = () => {
    
    this.getUser()
  };

  getUser = () => {
    axios.get('/api/user').then(results => {
      this.setState({ user: results.data.passport.user, user_climbing_image: results.data });
    });
  }


  handleFinishedUpload = info => {
    this.updateImage(info.fileUrl);
  };

  updateImage = imageUrl => {
    axios.put(
      `/api/routePic/${this.props.elem.id_of_route}/${this.state.user.id}`,
      { imageUrl }
    ).then(
      this.setState({
        user: Object.assign({}, this.state.user, { picture_of_route: imageUrl })
      })
    );
     
  };

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
    axios.put(`/api/rating/${this.props.elem.id_of_route}`, { newRating });
  };

  log_Route = async id => {
    await this.setState({
      display: false
    });
    await axios.put(`/api/description/${id}`, {
      description: this.state.description
    });
    await axios.put(`/api/timestamp/${id}`);
  };

  handleChange = e => {
    this.setState({
      description: e
    });
  };

  render() {
    const uploadOptions = {
      server: `${process.env.REACT_APP_SERVER}`,
      signingUrlQueryParams: { uploadType: 'avatar' }
    };
    const s3Url = `http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/`;
console.log(this.props)
    return (
      <div
        className={
          !this.props.elem.description_ && this.state.display
            ? 'display_route'
            : 'dont_display_route'
        }
      >
        <div className='route_header'>
          <button
            id='deleteButton'
            onClick={() => this.props.handleClickDel(this.props.elem.route_id)}
          >
            X
          </button>
          <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            maxSize={1024 * 1024 * 50}
            upload={uploadOptions}
          >
            <img
              id={
                !this.props.elem.picture_of_route
                  ? 'no_user_route_pic'
                  : 'user_route_pic'
              }
              src={this.state.user.picture_of_route || this.props.elem.picture_of_route}
              // src={this.state.user_climbing_image}
              placeholder={this.props.elem.picture_of_route}
              alt='alternative'
            />
          </DropzoneS3Uploader>
          <div className='route_name_and_stars'>
            <p className='routeName'>
              {this.props.route_name} {} {this.props.route_grade}
            </p>
            
            <button id='sent' onClick={() => this.props.handleClickSend(this.props.elem.route_id)}>✔</button>
            <StarRatings
              className='stars'
              rating={this.state.rating}
              starRatedColor='yellow'
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starDimension='1em'
              starSpacing='1px'
              starEmptyColor='white'
              starHoverColor='yellow'
              isSelectable='true'
            />
          </div>
        </div>
        <div className='journal_entry'>
          <textarea
            id='logInput'
            onChange={e => this.handleChange(e.target.value)}
          />
          <div
            className='logButton'
            onClick={() => this.log_Route(this.props.elem.route_id)}
          />
        </div>
      </div>
    );
  }
}
