import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import AuthContextProvider from './contexts/authContext'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './views/About'
import PostContextProvider from './contexts/PostContext'
import ReadMore from './views/ReadMore'
import FacePage from './views/FacePage';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/about" component={About} />
            <ProtectedRoute exact path="/readmore" component={ReadMore} />
            <ProtectedRoute exact path="/my-page" component={FacePage} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App
