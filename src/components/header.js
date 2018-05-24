import React, { Component } from 'react';
import './header.css';

class Header extends Component{
    render(){
        return (
            <div className="components-header row">
                <img src="logo.png" width="40" alt="" className="-col-auto"/>
                <h1 className="caption">React Music Player</h1>
           </div>
        );
    }
}

export default Header;