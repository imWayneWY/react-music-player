import React, { Component } from 'react';
import './header.less'

class Header extends Component{
    render(){
        return (
            <div className="component-header">
                <h1 className="caption">React Music Player</h1>
            </div>
        );
    }
}

export default Header;