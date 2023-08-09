/* eslint-disable no-unused-vars */
import React, {useContext} from "react";
import './DropDownProfile.scss';
import {ThemeContext} from "../../../theme/Theme";
import HoverButton from "./Button/HoverButton";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const DropDownProfile = () => {
    const useStyle = useContext(ThemeContext);
    return (
        <div style={useStyle.component} className="dropdown-profile">
            <HoverButton Icon={AccountBoxIcon} variant={"text"} text={"Profile"}/>
        </div>
    );
}
export default DropDownProfile;