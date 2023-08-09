/* eslint-disable no-unused-vars */
import React from 'react';
import './Playlist.scss';
import {useSelector} from "react-redux";
import MusicCard from "../MusicCard/MusicCard";
import Container from "../Container/Container";

const Playlist = () => {
    const typeOfPlaylist = window.location.pathname.substring(15);
    const {playlists} = useSelector(state=>state.musicReducer);
    return (
        <Container>
            <div  className={"Playlist"}>
                <h3>Your {typeOfPlaylist} playlist</h3>
                <div className="Playlist-container">
                    {
                        playlists.map((item)=>(
                            item.type === typeOfPlaylist &&
                            <MusicCard key={item.id} music={item}/>
                        ))
                    }
                </div>
            </div>
        </Container>
    );
}

export default Playlist;