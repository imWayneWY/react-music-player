import React, { Component } from 'react';
import MusicListItem from '../components/musicListItem';
import {Link} from 'react-router-dom';

class List extends Component{
    render(){
        let listEle = null;
        listEle = this.props.musicList.map((item) =>{
            return <MusicListItem key={item.id} musicItem={item} focus={item===this.props.currentMusicItem}></MusicListItem>
        });
        return (
            <ul>
                <li style={{ fontSize: "16px", color: "rgb(14, 145, 38)", marginBottom: "10px", marginLeft:"10px"}}><strong>
                <Link to="/">&lt; back to music player</Link>
                </strong></li>
                {listEle}
            </ul>
        )
    }
}

export default List;