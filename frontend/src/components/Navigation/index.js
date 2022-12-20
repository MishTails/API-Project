// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let currentUrl = window.location.href
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navbar'>
        <div className='navbutton'>
          <NavLink
          activeClassName="currentLink"
          to="/events">Events
          </NavLink>

          <NavLink
          activeClassName="currentLink"
          to="/groups">Groups
          </NavLink>
          <NavLink to="/groups/create">Start A New Group</NavLink>
          <ProfileButton user={sessionUser} />
         </div>
      </div>

    );
  } else {
    sessionLinks = (
      <div className='navbar'>
        <div className='navbutton'>
          <LoginFormModal  />
          <NavLink className="navLogSign" to="/signup">Sign Up</NavLink>
          <NavLink activeClassName="currentLink" to="/events">Events</NavLink>
          <NavLink activeClassName="currentLink"to="/groups">Groups</NavLink>
        </div>
      </div>

    );
  }

  return (
    <ul className="fullsite">
      <div className='logo'>
        <NavLink exact to="/"><a href="https://imgur.com/iqPBTJA"><img src="https://i.imgur.com/iqPBTJA.png" title="source: imgur.com" width={125}/></a></NavLink>
      </div>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
