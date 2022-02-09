// import files
import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';


const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>


        <nav className="text-center">
          {/* if true, logged in, display nav items tailored to the user */}
          {Auth.loggedIn() ? (
            <>
            {/* link: logged-in user's profile page, to: property being set to /profile */}
            {/* me - navigates to /profile */}
              <Link to="/profile">Me</Link>
              {/* a: carry out its duty to return to the root of the application */}
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
            {/* if false, display default items for logging in and signing up */}
              {/* to attr is used instead of href attr */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
