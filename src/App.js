import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Search from "./components/search";
import OrderForm from "./components/orderForm";
import Orders from "./components/orders"

import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <ul>
        <li>
          <Link to="/Search">Search</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/order">New Order</Link>
        </li>
      </ul>
        <div>
          <Route path="/search" component={Search} ></Route>
          <Route path="/order" component={OrderForm}></Route>
          <Route path="/orders" component={Orders}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
