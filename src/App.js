import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createSlots from './Components/createSlots';
import showSlotsManager from './Components/showSlotsManager'
import ShowSlotsOwner from './Components/showSlotsOwner';
import createBooking from './Components/createBooking';
import ShowBookingsManager from './Components/showBookingManager';
import updateSlot from './Components/updateSlots';
import register from './Components/register/register';
import login from './Components/login/login';
import Header from './Components/navBar/header';


function App() {
  return (
    <div className="App">
      <div>
      <Header/>
        <Router>
          <section>
            <Switch>
            <Route path="/updateSlot" component={updateSlot}  />
              <Route path="/createSlots" component={createSlots}  />
              <Route path="/showSlotsManager" component={showSlotsManager}  />
              <Route path="/showSlotsOwner" component={ShowSlotsOwner}  />
              <Route path="/register" component={register}  />
              <Route path="/login" component={login}  />
              <Route path="/createBooking/:id" component={createBooking}  />
              <Route path="/showBookingsManager/:id" component={ShowBookingsManager}  />
           
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default App;
