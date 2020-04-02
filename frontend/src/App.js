import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoanTableView from './components/LoanTableView'
import LenderTableView from './components/LenderTableView'
import StatisticsView from './components/StatisticsView'
import SearchView from './components/SearchView'

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/table/loans" component={LoanTableView}/>
            <Route path="/table/lenders" component={LenderTableView}/>
            <Route path="/statistics" component={StatisticsView}/>
            <Route path="/search" component={SearchView}/>
            <Redirect from="/" to="/table/loans"/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
