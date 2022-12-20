
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import attendeeReducer from "./attendance";
import eventsReducer from "./event";
import groupsReducer from "./group";
import membershipReducer from "./membership";
import sessionReducer from './session';



const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventsReducer,
  groups: groupsReducer,
  attendees: attendeeReducer,
  memberships: membershipReducer
});

// maybe need to fix attendees name
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
