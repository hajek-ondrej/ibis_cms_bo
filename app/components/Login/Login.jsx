import React from "react";
import "./login.scss"
import validate from "validate.js";
import creators from "../../creators/creators.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.sendCrendentials = this.sendCrendentials.bind(this);

        this.emailInput = null;
        this.pwdInput = null;
        this.constraints = { email: { email: true }, pwd: {length: {minimum: 8}} };
        this.debouncer = null;

        this.state = {
            validation: {
                email: null,
                pwd: null 
            }
        };
    }

    sendCrendentials() {
        const payload = {
            email: this.emailInput.value,
            pwd: this.pwdInput.value
        }

        validate.async(payload, this.constraints).then(
            success => {
                clearTimeout(this.debouncer)
                this.debouncer = setTimeout(() => {
    
                    this.setState(Object.assign(this.state, {
                        validation: {
                            email: true, pwd: true
                        }
                    }));
                    this.props.authorizeUser(payload);
                }, 300);
            },
            fail => {
                this.setState(Object.assign(this.state, {
                    validation: {
                        email: fail.email ? false : true,
                        pwd: fail.pwd ? false : true,
                    }
                }))
            }
        )
    }

    render () {
        const l = this.props.translations || {};
        const emailCls = this.state.validation.email === false ? 'wrong' : null;
        const pwdCls = this.state.validation.pwd === false ? 'wrong' : null;

        return (
            <div id="login">
                <div className="login-box">
                    <div className="form-group">
                        <div>
                            <label htmlFor="email">{l.email_address}:</label>
                            <input name="email" className={emailCls} ref={el => { this.emailInput = el}} onKeyUp={this.sendCrendentials} type="text" />
                        </div>
                        <div>
                            <label htmlFor="pwd">{l.password}:</label>
                            <input name="pwd" className={pwdCls} ref={el => { this.pwdInput = el}} onKeyUp={this.sendCrendentials} type="password" />
                        </div>
                    </div>

                    <div className="or">&copy; Ibis 2018</div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
};

export default connect(
    null, 
    dispatch => bindActionCreators({
        authorizeUser: creators.App.authorizeUser
    }, dispatch)
)(Login);