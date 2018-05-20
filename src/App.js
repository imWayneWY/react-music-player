import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Progress from './components/progress';
import $ from 'jquery';
import 'jplayer';



class App extends Component {
  constructor(){
    super();
    this.state={
      progress: '-'
    };
  }
  componentDidMount(){
    $('#player').jPlayer({
      ready: function(){
        $(this).jPlayer('setMedia',{
          mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      this.setState({
        progress: Math.round(e.jPlayer.status.currentTime)
      })
    });
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Progress progress={this.state.progress} ></Progress>
      </div>
    );
  }
}

export default App;
