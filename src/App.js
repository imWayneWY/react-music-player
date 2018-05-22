import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import $ from 'jquery';
import 'jplayer';
import Player from './page/player';
import {MUSIC_LIST} from './config/musiclist';
import List from './page/list';

class App extends Component {
 constructor(){
   super();
   this.state = {
     currentMusicItem: MUSIC_LIST[0],
     MusicList: MUSIC_LIST
   }
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
  }
 render() {
    return (
      <div className="App">
        <Header />  
        <List MusicList={this.state.MusicList} currentMusicItem={this.state.currentMusicItem}></List>
      </div>
    );
  }
}

export default App;
