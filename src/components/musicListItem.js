import React, { Component } from 'react';
import './musicListItem.css';
import Pubsub from 'pubsub-js';


class MusicListItem extends Component{
    playMusic(musicItem){
        Pubsub.publish("PLAY_MUSIC",musicItem);
    }
    deleteMusic(musicItem,e){
        e.stopPropagation();
        Pubsub.publish("DELETE_MUSIC",musicItem);
    }
    render(){
        let musicItem = this.props.musicItem;
        return(
            <li className={`components-listitem row ${this.props.focus ? 'focus' : ''}`} onClick={this.playMusic.bind(this,this.props.musicItem)}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className="-col-auto delete" onClick={this.deleteMusic.bind(this,musicItem)}></p>
            </li>
        );
    }
}

export default MusicListItem;