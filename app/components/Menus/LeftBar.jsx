import React from "react"
import "./left-bar.scss"
import { FiScissors, FiFile } from 'react-icons/fi';
import MenuLink from "./MenuLink.jsx";

class LeftBar extends React.Component {

    render () {
        return (
            <ul id="left-bar-menu">
                <MenuLink to="articles"><FiFile /></MenuLink>
                <MenuLink to="snippets"><FiScissors /></MenuLink>
            </ul>
        );
        
    }
}

export default LeftBar;