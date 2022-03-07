import React, { Component } from 'react';
import './App.css';
import Products from './components/products/products';

window.restApiUrl = 'http://127.0.0.1:8000/store';
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