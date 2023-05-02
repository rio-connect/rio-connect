import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUpPage from '../pages/SignUpPage';
import SignOutPage from '../pages/SignOutPage';
import NavBar from '../components/NavBar';
import SignInPage from '../pages/SignInPage';
import NotAuthorizedPage from '../pages/NotAuthorizedPage';
import LoadingSpinner from '../components/LoadingSpinner';
import AddClubPage from '../pages/AddClubPage';
import ClubCardTestPage from '../pages/ClubCardTestPage';
import UserPage from '../pages/UserPage';
import EditClubPage from '../pages/EditClubPage';
import BrowseClubsPage from '../pages/BrowseClubsPage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  /*  ready is used for the subscription, which might be useful later.
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  */
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signout" element={<SignOutPage />} />
        <Route path="/addclub" element={<ProtectedRoute><AddClubPage /></ProtectedRoute>} />
        <Route path="/:_id" element={<ProtectedRoute><EditClubPage /></ProtectedRoute>} />
        <Route path="/browseclubs" element={<BrowseClubsPage />} />
        <Route path="/clubcardtest" element={<ClubCardTestPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/home" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <LandingPage />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <LandingPage />,
};

export default App;
