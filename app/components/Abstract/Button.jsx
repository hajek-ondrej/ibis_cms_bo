import React from "react";
import "./button.scss";

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.toggleFocus = this.toggleFocus.bind(this);

        this.state = {
            focused: false
        }
    }

    toggleFocus() {
        this.setState(Object.assign(this.state, { focused: !this.state.focused }));
    }

    render () {
        const cls = this.state.focused ? "input-border focused" : "input-border";
        const groupCls = this.props.disabled ? "input-group disabled" : "input-group";
        return (
            <div className={groupCls} id={this.props.id}>
                <button type="button" disabled={this.props.disabled} onMouseEnter={this.toggleFocus} onClick={this.props.onClick} onMouseOut={this.toggleFocus}>{this.props.children}</button>
                <div className={cls}></div>
            </div>
        );
    }
}

Button.propTypes = {
};

export default Button;