import React, { Component } from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

class Header extends Component {
    constructor(){
        super();

        this.state = {
            clientName: []
        }
    }
    // componentDidMount(){
    //     axios.get('/api/user').then(res => {
    //         this.setState({
    //             clientName: res.data.passport.user.username
    //         })
    //     })
    // }
    render(){
        console.log(this.state)
    return (
        <div className="header">
            <h1 id="head">{this.props.title}</h1>
            {/* <p>Hi {this.state.clientName && this.state.clientName}</p> */}
        <Link to ='/'><p id='homebutton'>Home</p></Link>
        <Link to = '/plan'><p id='searchbutton'>{this.props.plan}</p></Link>
        <Link to ='/journal'><p id='journalbutton'>{this.props.journal}</p></Link>
        <Link to ='/profile'><p id='profilebutton'>{this.props.profile}</p></Link>
    </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      userName: state.userName
    };
  };
  
  export default connect(mapStateToProps)(Header);