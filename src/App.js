import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Devices from './components/Devices';
import DeviceList from './components/DeviceList';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Navbar from './components/Navbar';
import Modal from './components/Modal';


class App extends Component {
  render() {
    return (
      <div className="App-header App">
      <React.Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={DeviceList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>  
        <Modal />                   
      </React.Fragment>
      </div>
      );
    }
}

export default App;
