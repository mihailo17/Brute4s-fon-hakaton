import React from 'react'
import './App.css';
//import Directions from './components/Directions'
import Giver from './components/Giver'
import Header from './components/Header'
import Homepage from './components/Homepage'
import Receiver from './components/Receiver'
import Register from './components/Register'
import Login from './components/Login'
import {Route, BrowserRouter as Router} from "react-router-dom"
import UserContextProvider from './contexts/UserContext';


function App() {
  
  return (
    <>
    <Header/>
    <UserContextProvider>
      <Router>  
        <Route path="/" exact component={Homepage}/>
        <Route path="/giver" component={Giver}/>
        <Route path="/receiver" component={Receiver}/>
        <Route path="/register" component={Register}/>
        {/* <Route path="/" component={Directions}/> */}
      </Router>
    </UserContextProvider>
    </>
  )
}
 
export default App;
