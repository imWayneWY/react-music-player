import React, { Component } from 'react';
import './progress.css';

class Progress extends Component{
    changeProgress(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }
    render(){
        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
                <div className="progress" style={{width: `${this.props.progress}%`}} ></div>
            </div>
        );
    }
}

export default Progress;