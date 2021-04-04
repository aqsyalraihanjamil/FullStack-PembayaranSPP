import React, { Component } from 'react'
import Pembayaran from "./Pages/Home"
import Login from "./Pages/Login"
import {Switch, Route} from "react-router-dom"
export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Pembayaran}/>
        <Route path="/login" component={Login}/>
      </Switch>
    )
  }
}
