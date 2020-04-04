import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import TableView from './components/TableView'
import StatisticsView from './components/StatisticsView'
import SearchView from './components/SearchView'

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/table" component={TableView}/>
            <Route path="/statistics" component={StatisticsView}/>
            <Route path="/search" component={SearchView}/>
            <Redirect from="/" to="/table"/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
