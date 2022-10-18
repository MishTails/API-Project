// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/groups">Groups</NavLink>
      <NavLink to="/groups/create">Create A Group</NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/groups">Groups</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
