import React from 'react'
import './App.css';
import Giver from './components/Giver'
import Header from './components/Header'
import Homepage from './components/Homepage'
import Receiver from './components/Receiver'
import Register from './components/Register'
import Login from './components/Login'
import {Route, BrowserRouter as Router} from "react-router-dom"
import MapWithMarkers from './components/MapWithMarkers';
import MapGiver from './components/MapGiver';


function App() {
  
  return (
    <>
    <Header/>
    <Router>
      <Route path="/" exact component={Homepage}/>
      <Route path="/giver" component={Giver}/>
      <Route path="/receiver" component={MapWithMarkers}/>
      <Route path="/register" component={Register}/>
      <Route path="/pathfinding" component={MapWithMarkers}/>
      <Route path="/mapgiver" component={MapGiver}/>
    </Router>
    </>
  )
}
 
export default App;