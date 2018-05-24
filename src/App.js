import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import $ from 'jquery';
import 'jplayer';
import Player from './page/player';
import {MUSIC_LIST} from './config/musiclist';
import List from './page/list';
import {HashRouter as Router,  Route, Switch} from 'react-router-dom';
import Pubsub from 'pubsub-js';

class App extends Component {
 constructor(){
   super();
   this.state = {
     currentMusicItem: MUSIC_LIST[0],
     musicList: MUSIC_LIST,
     repeatType: "cycle"
   }
 }
 playMusic(musicItem){
    $('#player').jPlayer(
      'setMedia',{
          mp3: musicItem.file 
        }).jPlayer('play');
    this.setState({
      currentMusicItem: musicItem
    })
 }
 indexOfMusicList(musicItem){
    return this.state.musicList.indexOf(musicItem);
 }
 playNext(type='next'){
    let index = this.indexOfMusicList(this.state.currentMusicItem);
    let length = this.state.musicList.length;
    let newIndex = index;
    let repeatType = this.state.repeatType;
    if(repeatType === 'cycle'){
      if(type === 'next') {
        newIndex = (index + 1) % length;
      } else {
        newIndex = (index - 1 + length) % length;
      }
    } else if(repeatType === 'random') {
      do{
        newIndex = Math.floor(length * Math.random());
      } while (newIndex === index)
    }
    this.playMusic(this.state.musicList[newIndex]);
 }
 componentDidMount(){
     $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    this.playMusic(this.state.currentMusicItem);
    $("#player").bind($.jPlayer.event.ended, (e)=> {
      this.playNext();
    });
    Pubsub.subscribe("PLAY_MUSIC",(msg,musicItem)=>{
      this.playMusic(musicItem);
    });
    Pubsub.subscribe("DELETE_MUSIC",(msg,musicItem)=>{
      this.setState({
        musicList: this.state.musicList.filter((item) => {
          return item !== musicItem;
        })
      });
    });
 }
 componentWillUnmount(){
   Pubsub.unsubscribe("PLAY_MUSIC");
   Pubsub.unsubscribe("DELETE_MUSIC");
   $("#player").unbind($.jPlayer.event.end);
 }
 changeRepeatHandler(){
   let newType = this.state.repeatType;
   if(newType === 'cycle'){
     newType = 'random';
   } else if(newType === 'random'){
     newType = 'once';
   } else {
     newType = 'cycle';
   }

   this.setState({
     repeatType:  newType
   });
 }
 render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' render={()=>{
              return <Player 
                currentMusicItem={this.state.currentMusicItem} 
                playNext={this.playNext.bind(this)} 
                repeatType={this.state.repeatType}
                changeRepeatHandler={this.changeRepeatHandler.bind(this)}
                />
            }} />
            <Route path='/list' render={()=> {
              return <List 
                currentMusicItem={this.state.currentMusicItem}  
                musicList={this.state.musicList}
                />
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
