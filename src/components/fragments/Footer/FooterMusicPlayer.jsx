/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import './FooterPlayer.scss';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Slider from '@mui/material/Slider';
import Avatar from '@mui/material/Avatar';
import ControlsToggleButton from "./ToggleButton/ControlsToggleButton";
import Name from "../Name/Name";
import { ThemeContext } from "../../../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { setBannerOpen, setCurrentPlaying } from "../../../actions/actions";
import Button from '@mui/material/Button';

function FooterMusicPlayer({ music }) {

    const [{ id, name, author_name, img, musicName }, setCurrTrack] = useState(music);
    const [isRepeatClicked, setRepeatClick] = useState(false);
    const [isPrevClicked, setPrevClicked] = useState(false);
    const [isNextClicked, setNextClicked] = useState(false);
    const [isPlaying, setPlayPauseClicked] = useState(false);
    const [isVolumeClicked, setVolumeClicked] = useState(false);
    const [volume, setVolume] = useState(20);
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const [bannerToggle, setBannerToggle] = useState(false);

    const audioElement = useRef();
    const dispatch = useDispatch();
    const { playlists } = useSelector(state => state.musicReducer);
    const useStyle = useContext(ThemeContext);
    const pointer = { cursor: "pointer", color: useStyle.theme };

    const handleToggle = (type, val) => {
        switch (type) {
            case "repeat":
                setRepeatClick(val);
                break;
            case "prev":
                setPrevClicked(val);
                break;
            case "play-pause":
                setPlayPauseClicked(val);
                break;
            case "next":
                {
                    setNextClicked(val);
                }
                break;
            case "volume":
                setVolumeClicked(val);
                break;
            default:
                break;
        }
    };
    const handleSeekChange = (event, newValue) => {
        audioElement.current.currentTime = (newValue * duration) / 100;
        setSeekTime(newValue)
    };
    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };
    const handleBannerToggle = () => {
        setBannerToggle(!bannerToggle);
    };


    useEffect(() => {
        dispatch(setBannerOpen(bannerToggle));
    }, [dispatch, bannerToggle]);


    useEffect(() => {
        isPlaying
            ? audioElement.current.play().then(() => { }).catch((e) => {
                audioElement.current.pause();
                audioElement.current.currentTime = 0;
            })
            : audioElement.current.pause();
        audioElement.current.loop = isRepeatClicked;
        audioElement.current.volume = volume / 100;
        audioElement.current.muted = isVolumeClicked;
        audioElement.current.onloadeddata = () => {
            if (audioElement.current != null)
                setDuration(audioElement.current.duration)
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            if (audioElement.current !== null)
                setCurrTime(audioElement.current.currentTime);
        }, 500)
    }, [])
    useEffect(() => {
        setCurrTrack(music);
    }, [music]);


    useEffect(() => {
        setSeekTime((currTime) / (duration / 100))
    }, [currTime, duration]);



    useEffect(() => {
        audioElement.current.onended = () => {
            setNextClicked(true);
        };
    })

    useEffect(() => {
        if (isNextClicked) {
            let currTrackId = (id + 1) % playlists.length;
            dispatch(setCurrentPlaying(playlists[currTrackId]));
            setNextClicked(false);
        }
        if (isPrevClicked) {
            let currTrackId = (id - 1) % playlists.length;
            if ((id - 1) < 0) {
                currTrackId = playlists.length - 1;
            }
            dispatch(setCurrentPlaying(playlists[currTrackId]));
            setPrevClicked(false);
        }
    }, [dispatch, id, isNextClicked, isPrevClicked, playlists]);


    function formatTime(secs) {
        const t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        let s = t.toTimeString().substr(0, 8);
        if (secs > 86399)
            s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
        return s.substring(3);
    }
    return (
        <div style={useStyle.component} className={"footer-player"}>
            <div className="playback">
                {
                    !isNaN(seekTime) &&
                    <Slider style={{ color: useStyle.theme }}
                        className={"playback-completed"}
                        value={seekTime} onChange={handleSeekChange} />
                }
            </div>
            <Button
                startIcon={<Avatar variant="square" src={"../img/" + img} alt={name} />}
                onClick={handleBannerToggle}
                className="curr-music-container">
                <div className="curr-music-details">
                    <Name name={name} className={"song-name"} length={name.length} />
                    <Name name={author_name} className={"author-name"}
                        length={author_name.length} />
                </div>
            </Button>
            <div className="playback-controls">

                <ControlsToggleButton style={pointer} type={"repeat"}
                    defaultIcon={<RepeatIcon fontSize={"large"} />}
                    changeIcon={<RepeatOneIcon fontSize={"large"} />}
                    onClicked={handleToggle} />

                <ControlsToggleButton style={pointer} type={"prev"}
                    defaultIcon={<SkipPreviousIcon fontSize={"large"} />}
                    changeIcon={<SkipPreviousIcon fontSize={"large"} />}
                    onClicked={handleToggle} />

                <audio ref={audioElement} src={"../music/" + musicName} preload={"metadata"} />

                <ControlsToggleButton style={pointer} type={"play-pause"}
                    defaultIcon={<PlayArrowIcon fontSize={"large"} />}
                    changeIcon={<PauseIcon fontSize={"large"} />}
                    onClicked={handleToggle} />


                <ControlsToggleButton style={pointer} type={"next"}
                    defaultIcon={<SkipNextIcon fontSize={"large"} />}
                    changeIcon={<SkipNextIcon fontSize={"large"} />}
                    onClicked={handleToggle} />
            </div>
            <div className="playback-widgets">
                <div className="timer">
                    <p>
                        <span>{formatTime(currTime)}</span>
                        /
                        <span>{formatTime(duration)}</span>
                    </p>
                </div>
                <div className={"slider"}>
                    <Slider style={{ color: useStyle.theme }} value={volume} onChange={handleVolumeChange} />
                </div>
                <ControlsToggleButton style={pointer} type={"volume"}
                    defaultIcon={<VolumeUpIcon />}
                    changeIcon={<VolumeOffIcon />}
                    onClicked={handleToggle} />
            </div>
        </div>

    );
}

export default FooterMusicPlayer;