import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Signin from './user/Signin';
import AllTutors from './user/AllTutors';
import TutorPage from './user/TutorPage';
import Home from './user/Home';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tutors" exact component={AllTutors} />
        <Route path="/tutor/:tutorId" exact component={TutorPage} />
        <Route path="/signin" exact component={Signin} />
      </Switch>
    </Router>
  </div>
)


export default App;
