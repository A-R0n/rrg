import React, { Component } from 'react';

export default class RouteLog extends Component{
        render(){
            return (
                <div className="individualRoute" >
                        <p id="profileRouteName">{this.props.route_name}</p>
                        <p id={this.props.sent ? 'checkmark' : 'trady'}>✔</p>
                        <p id="profileRouteDescription">{this.props.description_}</p>
                        <p id="profileRouteTimeStamp">{this.props.timestamp_}</p>
                </div>
            )
        }
    }