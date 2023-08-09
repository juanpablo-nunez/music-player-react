import React from "react";
import {Link} from "react-router-dom";
import "./Brand.scss";
import Logo from "../../../../assets/img/apple.svg"

class Brand extends React.Component {
    render() {
        return (
            <div  className={"brand"}>
                <Link to={"/home"}>
                    <h1>
                        <img src={Logo} width={"24px"} alt=""/>
                        Music
                    </h1>
                </Link>
            </div>
        );
    }
}

export default Brand;