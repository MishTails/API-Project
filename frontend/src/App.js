import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventIndex from "./components/Events";
import HomeIndex from "./components/Home";
import EventPage from "./components/Events/EventPage";
import GroupIndex from "./components/Groups";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <HomeIndex />
          </Route>
          <Route exact path="/events">
            <EventIndex />
          </Route>
          <Route path="/events/:eventId" >
            <EventPage />
          </Route>
          <Route>
            <GroupIndex/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
