import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import RouteLog from '../RouteLog/RouteLog.js';

export default class Profile extends Component {
    constructor(){
        super();

        this.state = {
            iNeedToBringInRedux: []
        }
    }
    componentDidMount(){
        axios.get('/api/table').then(results => {
            this.setState({
                iNeedToBringInRedux: results.data,
            })
            console.log(this.state.iNeedToBringInRedux)
        })
    }

    render(){
        let anotherMap = this.state.iNeedToBringInRedux.map((elem, i) => {
            return <RouteLog key = {i} route_name = {elem.route_name}
            description_ = {elem.description_} timestamp_ = {elem.time_stamp} />

        })
        console.log('this is anotherMap', anotherMap)
        return (
            <div className="entireProfile">
                <div className="topHalf">
                    <img className="profilePic"></img>
                    <button className="editProfileButton">Edit Profile </button>
                    <textarea className="userName" placeholder="User Name"></textarea>
                    <textarea className="biography" placeholder="Biography"></textarea>
                    <textarea className="location" placeholder="Location"></textarea>
                    <div className="profileData">
                        <button id="one">Journal</button>
                        <button id="two">Media</button>
                        <button id="three">Sends</button>
                        <button id="four">Projects</button>
                    </div>
                </div> 
                <div className="bottomHalf">
                    <div className="allJournalEntries">
                    {anotherMap}
                    </div>
                    <div className="allMedia">
                    
                    </div>
                    <div className="allSends">
                    
                    </div>
                    <div className="allProjects">
                    
                    </div>
                </div>
            </div>
        )
    }
}