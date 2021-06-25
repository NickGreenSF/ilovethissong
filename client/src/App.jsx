import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TopPart from './component/TopPart';
import SoloView from './pages/SoloView';
import './App.css';
import MultiView from './pages/MultiView';
import ListingSubmit from './pages/ListingSubmit';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div>
        <TopPart />
        <Switch>
          <Route path="/" exact component={MultiView} />
          <Route path="/soloview" component={SoloView} />
          <Route path="/listingsubmit" component={ListingSubmit} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
