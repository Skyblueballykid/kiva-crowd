import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AppLayout from './components/applayout';
import LoanTable from './pages/loantable';
import LenderTable from './pages/lendertable';
import Statistic from './pages/statistic';
import SearchTable from './pages/searchtable';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route path="/table/loans" component={LoanTable} />
          <Route path="/table/search" component={SearchTable}/>
          <Route path="/table/lenders" component={LenderTable} />
          <Route path="/statistics" component={Statistic} />
          <Redirect from="/" to="/table/loans" />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
