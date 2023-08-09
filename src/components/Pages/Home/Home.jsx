import React, { useContext, useEffect, useState } from "react";
import './Home.scss';
import Navigation from "../../fragments/Navigation/Navigation";
import MobileTopNavigation from "../../fragments/Navigation/MobileTop/MobileTopNavigation";
import SideBar from "../../fragments/SideBar/SideBar";
import FooterMusicPlayer from "../../fragments/Footer/FooterMusicPlayer";
import BottomNavigationMobile from "../../fragments/Navigation/BottomNavigation/BottomNavigationMobile";
import MusicCardContainer from "../../fragments/MusicCard/MusicCardContainer";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../../theme/Theme";
import AddMusic from "../../fragments/AddMusic/AddMusic";
import FooterSelectMusic from "../../fragments/Footer/SelectMusic/FooterSelectMusic";
import CurrentPlayingLarge from "../../fragments/PlayingMusic/CurrentPlayingLarge";
import Search from "../Search/Search";
import Playlist from "../../fragments/PlayList/Playlist";
import Skeleton from '@mui/material/Skeleton';

function getCurrPage(pathName) {
    switch (pathName) {
        case "/home/":
            return <MusicCardContainer />
        case "/home/search":
            return <Search />
        case "/home/add":
            return <AddMusic />
        default:
            if (pathName.startsWith("/home/playlist/")) {
                return <Playlist />
            }
            return null
    }
}

function Home() {


    const [screenSize, setScreenSize] = useState(undefined);
    const [currMusic, setCurrMusic] = useState(null);
    const [Page, setCurrPage] = useState(<MusicCardContainer />);
    let pathname = window.location.pathname;
    useEffect(() => {
        setCurrPage(getCurrPage(pathname))
    }, [pathname]);

    window.addEventListener("resize", handleResize);

    function handleResize() {
        setScreenSize(window.innerWidth);
    }

    useEffect(() => {
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    });

    const useStyle = useContext(ThemeContext);
    const { playing, bannerOpen } = useSelector(state => state.musicReducer);


    useEffect(() => {
        setCurrMusic(playing)
    }, [playing])

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, []);


    return (
        <div style={useStyle.component} className={"home-container"}>
            {
                !loaded ?
                    <div className="Home-skeleton">
                        <Skeleton animation={"wave"} variant={"rect"} height={"100vh"} />
                    </div>
                    :
                    <>
                        {
                            screenSize <= 970 ?
                                <MobileTopNavigation /> :
                                <Navigation />
                        }
                        <section className={"home-music-container"}>
                            <div className="sidebar-home">
                                <SideBar />
                            </div>
                            <div className="main-home">
                                {
                                    Page
                                }
                            </div>
                        </section>
                        {
                            bannerOpen
                            &&
                            <section className="current-large-banner">
                                <CurrentPlayingLarge />
                            </section>
                        }
                        <React.Fragment>
                            {
                                currMusic
                                    ?
                                    <FooterMusicPlayer music={currMusic} />
                                    :
                                    <FooterSelectMusic />
                            }
                            {
                                screenSize <= 970 && <BottomNavigationMobile />
                            }
                        </React.Fragment>
                    </>
            }
        </div>
    );
}

export default Home;