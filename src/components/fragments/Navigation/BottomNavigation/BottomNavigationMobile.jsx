/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import './BottomNavigation.scss';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function BottomNavigationMobile() {
    const [menuItems, setMenuItem] = useState([
        {
            id: 0,
            icon: <HomeIcon/>,
            href: "/home",
            label: "Home"
        },
        {
            id: 1,
            icon: <SearchIcon/>,
            href: "/home/search",
            label: "Search"
        },
        {
            id: 2,
            icon: <AccountBoxIcon/>,
            href: "/home/profile",
            label: "Profile"
        },
        {
            id: 3,
            icon: <ExploreIcon/>,
            href: "/home/about",
            label: "About"
        }
    ]);
    let currPath = window.location.pathname;
    return (
        <div className="bottom-navigation">
            {
                menuItems.map(({id, icon, href, label}) => (
                    <Link className={"bottom-navigation-link"} key={id} to={href}>
                        <Button className={`${currPath === href ? "BottomNavAction active" : "BottomNavAction"}`}
                                    style={{borderRadius: 0}}>
                            {icon}
                        </Button>
                        <span className="label">
                                {
                                    label
                                }
                            </span>
                    </Link>
                ))
            }
        </div>
    );
}

export default BottomNavigationMobile;