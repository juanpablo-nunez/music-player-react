/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useRef} from "react";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function SideBarOptions(props) {
    const Icon = props.Icon;
    const title = props.title;
    const className = props.className;
    const sideBarRef = useRef();
    const href = props.href;
    return (
        <Button onClick={()=>{sideBarRef.current.click();}} className={className} startIcon={Icon && <Icon/>}>
            <Link ref={sideBarRef} to={href}/>
            {title}
        </Button>
    );
}

export default SideBarOptions;