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
    componentDidMount(){
        axios.get('/api/user').then(res => {
            res.data.pasport &&
         this.setState({
                clientName: res.data.passport.user.username
            })
        })
    }
    render(){
        console.log(this.state)
    return (
        <div className="header">
            <h1 id="head">{this.props.title}</h1>
            {this.state.clientName.length !== 0 &&
            <p> Hi {this.state.clientName}</p>}
            <div className='rightSideOfHeader'>

        <Link to ='/'><p className='homebutton'>Home</p></Link>
        <Link to = '/plan'><p className='searchbutton'>{this.props.plan}</p></Link>
        <Link to ='/journal'><p className='journalbutton'>{this.props.journal}</p></Link>
        <Link to ='/profile'><p className='profilebutton'>{this.props.profile}</p></Link>
            </div>
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