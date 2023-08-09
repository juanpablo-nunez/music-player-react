/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useRef, useState} from 'react';
import './AddMusic.scss';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Button from '@mui/material/Button';
import {ThemeContext} from "../../../theme/Theme.js";
import musicDB from "../../../db/music";

function AddMusic() {
    const useStyle = useContext(ThemeContext);
    const fileRef = useRef();
    const [selected,setSelected] = useState(null);
    const selectImg = () =>{
        fileRef.current.click()
    }
    useEffect(()=>{
        fileRef.current.onchange = (e) => {
            setSelected(e.target.files[0].name)
        }
    })
    let id =musicDB[musicDB.length-1].id + 1;
    return (
        <form style={useStyle.component} className={"AddMusic"}>
            <div className="add-music-sub-container">
                <div className="d1">
                    <Button  onClick={selectImg}  style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"} >
                        <ImageIcon titleAccess={"Select a music cover"} style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    <input ref={fileRef} accept="image/*" type="file" hidden id={"music-img"}/>
                    <p>{selected}</p>
                    <Button htmlFor={"music-img"} onClick={selectImg}  style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"} >
                        <MusicNoteIcon titleAccess={"Select a music"}  style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    <input accept="audio/*" hidden type="file"/>
                    <select>
                        <option value="0">Select Language</option>
                        <option value="1">English</option>
                    </select>
                </div>
                <div className="d2">
                    <div>
                        <input type="text" value={"ID: "+id} disabled/>
                        <input type="text" placeholder={"CurrentPlayingLarge Name"} id={"name"}/>
                        <input type="text" placeholder={"Singer Name"} id={"artist"}/>
                        <Button  style={{backgroundColor: useStyle.theme}} variant={"contained"} endIcon={<AddIcon/>}>
                            Add
                        </Button>
                    </div>
                    <div className={"preview"}>
                        <h3>Preview</h3>
                        <p>Music Cover : {selected}</p>
                        <p>Music Image : {selected}</p>
                        <p>Music Name : {selected}</p>
                        <p>Singer Name : {selected}</p>
                        <p>Language : {selected}</p>
                    </div>
                </div>
            </div>

        </form>
    );
}

export default AddMusic;