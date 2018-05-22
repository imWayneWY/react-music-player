import React, { Component } from 'react';
import MusicListItem from '../components/musicListItem';

class List extends Component{
    render(){
        let listEle = null;
        listEle = this.props.MusicList.map((item) =>{
            return <MusicListItem key={item.id} musicItem={item} focus={item===this.props.currentMusicItem}></MusicListItem>
        });
        return (
            <ul>
                {listEle}
            </ul>
        )
    }
}

export default List;