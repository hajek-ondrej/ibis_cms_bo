import React from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import Loader from "./Loader.jsx";
import Async from "./Abstract/Async.jsx";
import LeftBar from "./Menus/LeftBar.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

class App extends React.Component {
    
    render () {
        if (this.props.logged)
            return (
                <div>
                    <LeftBar />
                    <div id="app-board">
                        <Route exact path="/" render={() => <Async load="Dashboard" />} />
                        <Route path="/article/:id?" render={({ match }) => <Async load="Article" dir="Deltas" id={match.params.id} />} />
                        <Route exact path="/articles" render={() => <Async load="Articles" dir="Deltas" />} />
                    </div>
                    <ToastContainer hideProgressBar={true} />
               </div>
            )
        else if (this.props.pathname === '/login')
            return <div>
                    <Route path="/login" render={() => <Async load="Login" />} />
               </div>
        else
            return <Loader />;
        
    }
}

App.propTypes = {
    
};

export default connect(
    state => {
        return {
            pathname: state.router.location.pathname,
            logged: state.User.logged
        }
    }
)(App);