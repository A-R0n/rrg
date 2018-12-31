import React, { Component } from 'react';
import axios from 'axios';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import { connect } from 'react-redux';
import { addImage } from '../redux/reducer';
require('dotenv').config();

class Upload extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      file: null,
      string: '',
      user: {}
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    axios.get(`/api/user`).then(results => {
      if (results.data.passport) {
        this.setState({
          user: results.data.passport.user
        });
      }
    });
  };

  handleFinishedUpload = info => {
    this.updateImage(info.fileUrl);
  };

  updateImage = imageUrl => {
    this.props.addImage(imageUrl).then(
      this.setState({
        user: Object.assign({}, this.state.user, { image_url: imageUrl })
      })
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const uploadOptions = {
      server: process.env.REACT_APP_SERVER,
      signingUrlQueryParams: { uploadType: 'avatar' }
    };
    const s3Url = `http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/`;
    return (
      <DropzoneS3Uploader
        className='TheDropper'
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
        id='imageUploader'
      >
        <img
          className='profilePic'
          src={this.state.user.image_url}
          alt='text'
        />
        <p
          id={
            this.state.user.length === 0 ? 'textInDropzone' : 'noTextInDropzone'
          }
        >
          Try dropping some files here, or click to select files to upload.
        </p>
      </DropzoneS3Uploader>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { addImage }
)(Upload);
