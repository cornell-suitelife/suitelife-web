import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PageLayout from './components/PageLayout';
import Home from './components/Home';
import SuiteDoor from './components/SuiteDoor';
import SuiteCalendar from './components/SuiteCalendar';
import Music from './components/Music';
import NotFound from './components/NotFound';

const routes = (
  <Route path='/' component={PageLayout}>
  	<IndexRoute component={Home}/>
  	<Route path='suite-door' component={SuiteDoor}/>
  	<Route path='calendar' component={SuiteCalendar}/>
  	<Route path='music' component={Music}/>
  	<Route path='*' component={NotFound}/>
  </Route>
);

export default routes;