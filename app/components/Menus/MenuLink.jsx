import React from "react"
import "./left-bar.scss"
import { Link, withRouter } from "react-router-dom";

class MenuLink extends React.Component {

    render () {
        const target = "/" . concat(this.props.to)
        const cls = this.props.location.pathname == target ? 'active' : null;
        return (
            <li className={cls}><Link to={target}>{this.props.children}</Link></li>
        );
    }
}

export default withRouter(MenuLink);