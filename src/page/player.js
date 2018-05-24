import React, { Component } from 'react';
import Progress from '../components/progress';
import $ from 'jquery';
import 'jplayer';
import './player.css';
import { Link } from 'react-router-dom';


let duration = null;
class Player extends Component {
  constructor(){
    super();
    this.state={
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    };
  }
  componentDidMount(){
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      });
      //console.log(this.state);
    });
  }
  formatTime(time){
    time  = Math.floor(time);
    let min = Math.floor(time/60);
    let sec = Math.floor(time%60);
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
  }
  componentWillUnmount(){
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  changeProgressHandler(progress){
    $('#player').jPlayer('play', duration * progress);
  }
  changeVolumeHandler(progress){
    $('#player').jPlayer('volume', progress);
  }
  play(){
    if(this.state.isPlay){
      $('#player').jPlayer('pause');
    } else {
      $('#player').jPlayer('play');
    }
    this.setState({
      isPlay: !this.state.isPlay
    });
  }
  next(){
    this.setState({
      isPlay: true
    });
    this.props.playNext();
  }
  prev(){
    this.setState({
      isPlay: true
    });
    this.props.playNext('prev');
  }
  changeRepeat(){
    this.props.changeRepeatHandler();
  }
  render() {
    return (
      <div className="player-page">
      <h1 className='caption'><Link to="/list">my favourite music &gt;</Link></h1>
      <div className="mt20 row">
        <div className="controll-wrapper">
          <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
          <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
          <div className="row mt20">
            <div className="left-time -col-auto">-{this.state.leftTime}</div>
            <div className="volume-container">
              <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
              <div className="volume-wrapper">
                <Progress
          progress={this.state.volume}
          onProgressChange={this.changeVolumeHandler.bind(this)}
          barColor='#aaa'
                >
                </Progress>
              </div>
            </div>
          </div>
          <div style={{height: 10, lineHeight: '10px'}}>
            <Progress
      progress={this.state.progress}
      onProgressChange={this.changeProgressHandler.bind(this)}
            >
            </Progress>
          </div>
          <div className="mt35 row">
            <div>
              <i className="icon prev" onClick={this.prev.bind(this)}></i>
              <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
              <i className="icon next ml20" onClick={this.next.bind(this)}></i>
            </div>
            <div className="-col-auto">
              <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat.bind(this)}></i>
            </div>
          </div>
        </div>
        <div className="-col-auto cover">
          <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
        </div>
      </div>
  </div>
    );
  }
}

export default Player;