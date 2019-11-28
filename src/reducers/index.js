import accounts from "./accounts";
import { combineReducers } from "redux";
import logs from "./logs";
import notifications from "./notifications";

export default combineReducers({ accounts, logs, notifications });
