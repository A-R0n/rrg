import React, { Component } from 'react';
import ReactS3 from 'react-s3';
import axios from 'axios';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import {connect} from 'react-redux';
import {addImage} from "../redux/reducer";
require('dotenv').config();




 
//Optional Import


const {S3_BUCKET, AS3_ACCESS_KEY_ID, AS3_SECRET_ACCESS_KEY} = process.env
 
const config = {
    bucketName: S3_BUCKET,
    albumName: 'images',
    region: 'us-east-1',
    accessKeyId: AS3_ACCESS_KEY_ID,
    secretAccessKey: AS3_SECRET_ACCESS_KEY
}
class Upload extends Component {
    constructor(){
        super();

        this.state = {
            name: "",
            file: null,
            string: '',
            user: {}
        }
    }

    componentDidMount(){
        axios.get('/api/user').then(results => {
            this.setState({
                user: results.data.passport.user
            })
        })
    }

    handleFinishedUpload = info => {
        console.log("File uploaded with filename", info.filename);
        console.log("Access it on s3 at", info.fileUrl);
        this.updateImage(info.fileUrl);
        // await console.log(this.props.main.image);
        // await this.setState({ image: this.props.main.image });
      };

      updateImage = imageUrl => {
          console.log('updateImage props', this.props)
        this.props
          .addImage(imageUrl)
          .then(this.setState({ string: this.props.image_ }));
      };
    

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    render(){
        console.log(this.props)
        const uploadOptions = {
            server: process.env.REACT_APP_SERVER,
            signingUrlQueryParams: { uploadType: "avatar"}
        };
        const s3Url = `http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/`
        console.log(this.state.user)
        return(
            <div className='uploadImg'>
                    <DropzoneS3Uploader className='TheDropper'
                        onFinish = {this.handleFinishedUpload}
                        s3Url={s3Url}
                        maxSize={1024 * 1024 * 5}
                        upload={uploadOptions}
                        id="imageUploader">
                        <img className='profilePic' src={this.state.user.image_url} alt='text'></img>
                        <p id={this.state.user.length === 0 ? 'textInDropzone' : 'noTextInDropzone'}>
                            Try dropping some files here, or click to select files to upload.
                        </p>
                    </DropzoneS3Uploader>     
            </div>
        )
    }
}


const mapStateToProps = state => state;
export default connect(mapStateToProps, {addImage})(Upload);