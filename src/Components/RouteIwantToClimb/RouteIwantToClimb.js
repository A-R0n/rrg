import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
// import './RouteIWantToClimb.scss';
import RouteLog from '../RouteLog/RouteLog.js';
require('dotenv').config();


export default class RouteIwantToClimb extends Component {
  constructor() {
    super();

    this.state = {
      display: true,
      description: '',
      rating: 0,
      user: {},
      myCart: [],
      user_climbing_image: null
    };
  }

  componentDidMount = async () => {
    await axios.get('/api/user').then(results => {
      console.log(results.data)
      this.setState({ user: results.data.passport.user,
      myCart: results.data})
      
    });
  };

  handleFinishedUpload = info => {
    this.updateImage(info.fileUrl);
  };

  updateImage = async (imageUrl) => {
    await axios
      .put(
        `/api/routePic/${this.props.elem.id_of_route}/${this.state.user.id}`,
        { imageUrl }
      )
      .then(results => {
        this.setState({ user_climbing_image: results.data.picture_of_route });
      });
  };

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
    axios.put(`/api/rating/${this.props.elem.id_of_route}`, { newRating });
  };

  log_Route = async id => {
    await axios.put(`/api/description/${id}`, {
      description: this.state.description
    });
    await this.setState({
      display: false
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
      server: process.env.REACT_APP_SERVER,
      signingUrlQueryParams: { uploadType: 'avatar' }
    };
    const s3Url = `http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/`;
    
    return (
      <div
        className={this.state.display ? 'display_route' : 'dont_display_route'}
      >
        <img className='journalImg' src={this.props.route_img} alt='routeImg' />
        <div className='Dropzone_Img'>
          <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
            id='imageUploader'
          >
            <img
              className='user_route_pic'
              src={this.props.picture_of_route}
              alt='text'
            />
            <p
              id={
                this.state.user.length === 0
                  ? 'textInDropzone'
                  : 'noTextInDropzone'
              }
            >
              Try dropping some files here, or click to select files to upload.
            </p>
          </DropzoneS3Uploader>
        </div>
        <p className='routeName'>
          {this.props.route_name} {} {this.props.route_grade}
        </p>
        <textarea
          id='logInput'
          onChange={e => this.handleChange(e.target.value)}
        />
        <button
          id='logButton'
          onClick={() => this.log_Route(this.props.elem.route_id)}
        >
          Log
        </button>
        <button
          id='sendButton'
          onClick={() => this.props.handleClickSend(this.props.elem.route_id)}
        >
          Send
        </button>
        <button
          id='deleteButton'
          onClick={() => this.props.handleClickDel(this.props.elem.route_id)}
        >
          Delete
        </button>
        <StarRatings
          className='stars'
          rating={this.state.rating}
          starRatedColor='yellow'
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
          starDimension='16px'
          starSpacing='1px'
          starEmptyColor='white'
          starHoverColor='rgb(243, 236, 186)'
          isSelectable='true'
        />
      </div>
    );
  }
}

