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
import GroupPage from "./components/Groups/GroupPage";
import GroupCreate from "./components/Groups/CreateGroupPage";
import EventCreate from "./components/Events/CreateEvent";
import EventUpdate from "./components/Events/UpdateEvent";
import GroupUpdate from "./components/Groups/UpdateGroup";

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
          <Route exact path="/events/:eventId" >
            <EventPage />
          </Route>
          <Route exact path="/groups/create">
            <GroupCreate/>
          </Route>
          <Route exact path = "/groups/:groupId/update">
            <GroupUpdate/>
          </Route>
          <Route path="/events/:eventId/update">
            <EventUpdate/>
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupPage/>
          </Route>
          <Route path="/groups/:groupId/events/create">
            <EventCreate/>
          </Route>
          <Route exact path="groups/:groupId/events/:eventId/update">
            <EventUpdate/>
          </Route>
          <Route exact path="/groups">
            <GroupIndex/>
          </Route>



        </Switch>
      )}
    </>
  );
}

export default App;
