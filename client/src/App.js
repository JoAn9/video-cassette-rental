import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { isLoggedIn, logout } from './auth';
import ActorDetail from './ActorDetail';
import LoginForm from './LoginForm';
import MovieBoard from './MovieBoard';
import MovieDetail from './MovieDetail';
import MovieForm from './MovieForm';
import NavBar from './NavBar';

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  let history = useHistory();

  const handleLogin = () => {
    setLoggedIn(true);
    history.push('/');
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    history.push('/');
  };

  return (
    <div>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <section className="section">
        <div className="container">
          <Switch>
            <Route exact path="/" component={MovieBoard} />
            <Route path="/actors/:actorId" component={ActorDetail} />
            <Route exact path="/movies/new" component={MovieForm} />
            <Route path="/movies/:movieId" component={MovieDetail} />
            <Route
              exact
              path="/login"
              render={() => <LoginForm onLogin={handleLogin} />}
            />
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default props => (
  <Router>
    <App {...props} />
  </Router>
);
