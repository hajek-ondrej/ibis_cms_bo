import React from "react";
import QSwitch from "react-switch";
import nano from "nanoid";
import "./switch.scss";

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: this.props.checked || false };
        this.onChange = this.onChange.bind(this);
        this.id = nano();
    }

    onChange(checked, event) {
        this.setState({
            checked
        });

        if (typeof this.props.onChange === 'function')
            this.props.onChange(event, checked);
    }

    render () {
        
        return (
            <div className="input-group" id={this.props.id}>
                <label htmlFor={this.id}>{this.props.children}</label>
                <QSwitch
                    onChange={this.onChange}
                    onColor="#F9690E"
                    handleDiameter={24}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 7px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    id={this.id}
                    className="ibis-switch"
                    checked={this.state.checked}
                />
            </div>
        );
    }
}

Switch.propTypes = {
};

export default Switch;