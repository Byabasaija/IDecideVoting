import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Card, Modal, Row } from "react-bootstrap";



//Components
import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";
import Header from "./Components/Header";
import Login from "./Components/Login";
import WalletLogin from "./Components/WalletLogin";

import {useLogin} from './Components/hooks/useLogin'

export default function App({ isSignedIn, contractId, wallet }) {
  const [promptList, changePromptList] = useState([]);
  const {loggedIn, user} = useLogin()

  const callMethod = async (methodName, args = {}) => {
    wallet.callMethod({
      contractId: contractId,
      method: methodName,
      args: args,
    });
  };

  const viewMethod = async (methodName, args = {}) => {
    return await wallet.viewMethod({
      contractId: contractId,
      method: methodName,
      args: args,
    });
  };

 
  const signInFun = () => {
    wallet.signIn();
  };

  const signOutFun = () => {
    wallet.signOut();
  };

  const getPrompts = async () => {
    return await viewMethod("getAllPrompts");
  };

  const displayHome = () => {
    if (isSignedIn && loggedIn) {
      return (
        <Routes>
          <Route
            path='/'
            element={
              <Home
                wallet={wallet}
                callMethod={callMethod}
                viewMethod={viewMethod}
                changeCandidates={changeCandidatesFunction}
                getPrompts={getPrompts}
                promptList={promptList}
                changePromptList={changePromptList}
              />
            }
          ></Route>
          <Route
            path='/newpoll'
            element={
              <NewPoll
                wallet={wallet}
                callMethod={callMethod}
                viewMethod={viewMethod}
                getPrompts={getPrompts}
                promptList={promptList}
                changePromptList={changePromptList}
              />
            }
          ></Route>
          <Route
            path='/pollingstation'
            element={
              <PollingStation
                wallet={wallet}
                callMethod={callMethod}
                viewMethod={viewMethod}
              />
            }
          ></Route>
        </Routes>
      );
    } else if(!isSignedIn && loggedIn){
      return (
       
        <WalletLogin user_name={user.user_name} signInFun={signInFun}/>
       
      );
    }else{
      return (
        
        <Login />
       
      )
    }
  };

  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await viewMethod("getCandidatePair", { prompt: prompt });
    await localStorage.setItem("Candidate1", namePair[0]);
    await localStorage.setItem("Candidate2", namePair[1]);
    await localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  return (
    <Router>
      {/* <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        {console.log("contract account is", isSignedIn)}
        <Container>
          <Navbar.Brand href='/'>
            <img src={"https://i.imgur.com/31dvjnh.png"}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link disabled={!isSignedIn} href='/newpoll'>
                New Poll
              </Nav.Link>
              <Nav.Link onClick={isSignedIn ? signOutFun : signInFun}>
                {isSignedIn ? wallet.accountId : "Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <Header isSignedIn={isSignedIn} wallet={wallet} signOutFun={signOutFun} signInFun={signInFun}/>
      {displayHome()}
    </Router>
  );
}
