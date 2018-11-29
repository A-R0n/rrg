import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
// import { connect } from "react-redux";
// import { routePic } from "../../redux/reducer";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";

export default class RouteIwantToClimb extends Component{
    constructor(){
        super();

        this.state = {
            display: true,
            description: '',
            rating: 0,
            user: {}
            
        }

        
    }



    componentDidMount() {
        axios.get("/api/user").then(results => {
          this.setState({user: results.data.passport.user});
        });
      }
    
      handleFinishedUpload = info => {
        this.updateImage(info.fileUrl);
      };
    
      updateImage = (imageUrl) => {
          console.log(imageUrl)

          axios.put(`/api/routePic/${this.props.elem.id_of_route}/${this.state.user.id}`, { imageUrl })
          .then(
            this.setState({
              user: Object.assign({}, this.state.user, { picture_of_route: imageUrl })
            })
          );
      }








    changeRating = ( newRating) => {
        this.setState({
            rating: newRating
        })
        axios.put(`/api/rating/${this.props.elem.id_of_route}`, {newRating})
    }

    handleClickPut = (id) => {
        axios.put(`/api/description/${id}`, {description: this.state.description}).then(res => {
            this.setState({
                display: false
            })
        })
        axios.put(`/api/timestamp/${id}`)
    }

    handleChange = (e) => {
        this.setState({
            description: e
        }) 
    }

        render(){
            const uploadOptions = {
                server: process.env.REACT_APP_SERVER,
                signingUrlQueryParams: { uploadType: "avatar" }
              };
              const s3Url = `http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/`;
              console.log(this.state.user)
            return (
                <div className={this.state.display ? 'everything' : 'nothing'}>
                    <img className='journalImg' 
                        src={this.props.route_img}
                        alt="text">
                    </img>
                    <DropzoneS3Uploader
                        onFinish={this.handleFinishedUpload}
                        s3Url={s3Url}
                        maxSize={1024 * 1024 * 5}
                        upload={uploadOptions}
                        id="imageUploader">
                    <img
                        className="profilePic"
                        src={this.state.user.picture_of_route}
                        alt="text"/>
                    <p id={this.state.user.length === 0 ? "textInDropzone" : "noTextInDropzone"}>
                    Try dropping some files here, or click to select files to upload.
                    </p>
                    </DropzoneS3Uploader>
                    <p className="routeName">{this.props.route_name} { } {this.props.route_grade}</p>
                    <textarea id='logInput' onChange={(e) => this.handleChange(e.target.value)}></textarea>
                    <button id='logButton' onClick={() => this.handleClickPut(this.props.elem.route_id)}>Log</button>
                    <button id='sendButton' onClick={() => this.props.handleClickSend(this.props.elem.route_id)}>Send</button>
                    <button id='deleteButton' onClick={() => this.props.handleClickDel(this.props.elem.route_id)}>Delete</button>
                    <StarRatings className='stars'
                        rating={this.state.rating}
                        starRatedColor="yellow"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension="16px"
                        starSpacing="1px"
                        starEmptyColor="white"
                        starHoverColor="rgb(243, 236, 186)"
                        isSelectable='true'
                        />
                    
                </div>
            )
        }
    }
    
