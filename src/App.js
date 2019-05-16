import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Search from './components/Search'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route 
            exact path='/' 
            component={Search}
        />
      </BrowserRouter>
    )
  }
}
