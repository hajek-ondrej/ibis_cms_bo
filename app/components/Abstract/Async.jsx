import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import creators from "../../creators/creators.js";

import Loader from "../Loader.jsx";


class Async extends React.Component {
    constructor(props) {
        super(props);
        this.state = { __async: null, loading: true };

        this.loadTranslations = {
            'Login': 1,
            'Dashboard': 2,
            'Articles': 3,
            'Article': 4
        }
        this.mounted = false;
        this.toggleLoading = this.toggleLoading.bind(this)
    }

    toggleLoading(loading) {
        if (this.mounted)
            this.setState(Object.assign(this.state, { loading: loading || false }));
    }

    componentDidMount() {
        
        this.mounted = true;
        this.toggleLoading(true);

        const dir = this.props.dir || this.props.load;

        import(
            '../' + dir + '/' + this.props.load + '.jsx'
        ).then(
          __async => {
              if (this.mounted)
                this.setState({ __async })
          }
        ).catch(e => 
            console.warn("Failed to load component: " + this.props.load, e)
        );

        if (this.loadTranslations.hasOwnProperty(this.props.load)) {
            this.props.getTranslations(this.loadTranslations[this.props.load]).then(this.toggleLoading);
        }
        else
            this.toggleLoading();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.loading)
            return <Loader />

        const Component = this.state.__async;
        return Component ? <Component.default {...this.props} /> : null;
    }
}

Async.propTypes = {
    load: PropTypes.string.isRequired,
    translations: PropTypes.object
};

export default connect(
    state => {
        return {
            translations: state.App.translations
        }
    },
    dispatch => {
        return bindActionCreators({
            getTranslations: creators.App.getTranslations
        }, dispatch)
    }
)(Async);