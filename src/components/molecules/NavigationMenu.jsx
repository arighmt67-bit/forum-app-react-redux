import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationMenu() {
  return (
    <nav className="navigation__menu">
      <NavLink to="/" end>
        Threads
      </NavLink>
      <NavLink to="/leaderboards">Leaderboard</NavLink>
    </nav>
  );
}

export default NavigationMenu;
