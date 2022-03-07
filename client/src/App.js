import React, { Component } from 'react';
import './App.css';
import Products from './components/product';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Products />
        
        <span>Nordhealth Homework</span>
      </div>
    );
  }
}

export default App;