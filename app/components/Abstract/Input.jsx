import "./input.scss";
import React from "react";
import nano from "nanoid";
import { FiEdit2, FiSearch, FiShield } from "react-icons/fi";

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.getInputOptions = this.getInputOptions.bind(this);
        this.toggleFocus = this.toggleFocus.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            focused: false
        }

    }

    onChange(event) {
        const target = event && event.target;
        const value = target && target.value || null;
        
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event, value);
        }
    }

    toggleFocus() {
        this.setState(Object.assign(this.state, { focused: !this.state.focused }));
    }

    getInputOptions() {
        switch (this.props.type) {
            case 'search':
                return {
                    type: 'text',
                    icon: <FiSearch />
                }
            case 'password': case 'pwd':
                return {
                    type: 'password',
                    icon: <FiShield />
                }
            default:
                return {
                    type: 'text',
                    icon: <FiEdit2 />
                };
        }
    }

    render () {
        const id = nano();
        const { type, icon } = this.getInputOptions();
        const cls = this.state.focused ? "input-border focused" : "input-border";
        return (
            <div className="input-group" id={this.props.id}>
                <label htmlFor={id}>{this.props.children}</label>
                <input type={type} value={this.props.value || ''} onFocus={this.toggleFocus} onBlur={this.toggleFocus} onChange={this.onChange} name={this.props.name} id={id} />
                {icon}
                <div className={cls}></div>
            </div>
        );
    }
}

Input.propTypes = {
};

export default Input;