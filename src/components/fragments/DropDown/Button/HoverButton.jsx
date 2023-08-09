/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useContext, useState} from 'react';
import './HoverButton.scss';
import Button from '@mui/material/Button';
import {ThemeContext} from "../../../../theme/Theme";
import {Link} from "react-router-dom";

function HoverButton({text,variant,Icon}) {
    const useStyle = useContext(ThemeContext);
    const [currStyle, setCurrStyle] = useState(null);
    const handleOver = () => {
        setCurrStyle(useStyle.button.onHover)
    };
    const handleOut = () => {
        setCurrStyle(null)
    };
    return (
        <Link to={"/home/"+text.toLowerCase()} className={"hb"}>
            <Button style={currStyle}
                    startIcon={Icon?<Icon/>:null}
                    variant={variant}   
                    onMouseOver={handleOver} onMouseOut={handleOut}>
                {text}
            </Button>
        </Link>
    );
}

export default HoverButton;