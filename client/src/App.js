import React, { Component } from 'react';
import './App.css';
import Products from './components/products/products';

window.restApiUrl = 'https://nhhomeworkapi.herokuapp.com/store';
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