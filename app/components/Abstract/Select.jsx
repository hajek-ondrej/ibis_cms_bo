import React from "react";
import "./select.scss";
import nano from "nanoid";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.toggleFocus = this.toggleFocus.bind(this);

        this.state = {
            focused: false,
            value: props.default || null
        }

        
    }

    toggleFocus() {
        this.setState(Object.assign(this.state, { focused: !this.state.focused }));
    }

    selectValue(value) {
        this.setState(Object.assign(this.state, { value }))
    }

        
    render () {
        const borderCls = this.state.focused ? "input-border focused" : "input-border";
        const dropCls = this.state.focused ? "dropdown open": "dropdown";
        const value = this.props.options[this.state.value];
        const options = Object.keys(this.props.options).map(
            k => {
                return <li key={k} onMouseDown={this.selectValue.bind(this, k)}>{this.props.options[k]}</li>
            }
        );

        return (
            <div className="input-group" id={this.props.id}>
                <div className="label">{this.props.children}</div>
                <div className="input" tabIndex="0" onFocus={this.toggleFocus} onBlur={this.toggleFocus}>{value}</div>
                <div className="icons">
                    <FiChevronLeft /><FiChevronRight />
                </div>
                <div className={borderCls}></div>
                <ul className={dropCls}>
                    {options}
                </ul>
            </div>
        );
    }
}

Select.propTypes = {
};

export default Select;