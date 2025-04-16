import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Swipe from './components/Swipe';
import Chat from './components/Chat';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import LoadingIndicator from './components/LoadingIndicator';
import Notification from './components/Notification';
import './styles.css';

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/swipe" component={Swipe} />
        <Route path="/chat" component={Chat} />
      </Switch>
      <Footer />
      <LoadingIndicator />
      <Notification message="Welcome to the app!" type="success" />
    </BrowserRouter>
  );
};

export default App;