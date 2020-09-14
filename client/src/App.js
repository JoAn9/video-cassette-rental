import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { isLoggedIn, logout, getLoggedUser } from './utils/auth';
import client from './graphql/client';
import ActorDetail from './ActorDetail';
import LoginForm from './LoginForm';
import MovieBoard from './MovieBoard';
import MovieDetail from './MovieDetail';
import MovieForm from './MovieForm';
import ActorForm from './ActorForm';
import NavBar from './NavBar';
import Chat from './Chat';
import UserContext from './contexts/UserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [user, setUser] = useState(getLoggedUser());

  let history = useHistory();

  const handleLogin = () => {
    setLoggedIn(true);
    setUser(getLoggedUser());
    history.push('/');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setLoggedIn(false);
    history.push('/');
  };

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={user}>
        <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
        <section className="section">
          <div className="container">
            <Switch>
              <Route exact path="/" component={MovieBoard} />
              <Route exact path="/actors/new" component={ActorForm} />
              <Route path="/actors/:actorId" component={ActorDetail} />
              <Route exact path="/movies/new" component={MovieForm} />
              <Route path="/movies/:movieId" component={MovieDetail} />
              <Route exact path="/Chat" component={Chat} />
              <Route
                exact
                path="/login"
                render={() => <LoginForm onLogin={handleLogin} />}
              />
            </Switch>
          </div>
        </section>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default props => (
  <Router>
    <App {...props} />
  </Router>
);
