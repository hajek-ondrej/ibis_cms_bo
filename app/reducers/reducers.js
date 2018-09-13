import { combineReducers } from "redux"
import App from "./App.js";
import User from "./User.js";
import Deltas from "./Deltas.js";

export default combineReducers({
    App, User, Deltas
});