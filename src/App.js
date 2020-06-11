import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DisplayMovieTab1 from './components/DisplayMovie/DisplayMovieTab1';
import DisplayMovieTab2 from './components/DisplayMovie/DisplayMovieTab2';
import Home from './components/Home/Home';
import 'bootswatch/dist/slate/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
      <Navbar/>      
        <Switch>
          <Route path="/" exact component={Home}/>          
          <Route path="/tab1" component={DisplayMovieTab1}/>
          <Route path="/tab2" component={DisplayMovieTab2}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
