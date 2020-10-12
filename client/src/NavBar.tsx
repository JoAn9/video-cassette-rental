import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type NavProps = {
  loggedIn: boolean;
  onLogout: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

function NavBar({ loggedIn, onLogout }: NavProps): ReactElement {
  if (loggedIn) {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/actors/new">
            Add Actor
          </Link>
          <Link
            className="navbar-item"
            to="/movies/new"
            data-test="post-movie-button"
          >
            Post Movie
          </Link>
          <Link className="navbar-item" to="/chat" data-test="chat-button">
            Chat
          </Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="navbar-item" onClick={onLogout}>
            Logout
          </a>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/login">
            Login
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
