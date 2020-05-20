import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Signin from './user/Signin';
import AllTutors from './user/AllTutors';
import TutorPage from './user/TutorPage';
import Home from './user/Home';

import TutorSignin from './user/TutorSignin';
import StudentSignin from './user/StudentSignin';

import PrivateRoute from './auth/PrivateRoute';
import Private from './user/Private';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tutors" exact component={AllTutors} />
        <Route path="/tutor/page/:tutorId" exact component={TutorPage} />
        <Route path="/tutor/signin" exact component={TutorSignin} />
        <Route path="/student/signin" exact component={StudentSignin} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/private" exact component={Private} />
      </Switch>
    </Router>
  </div>
)


export default App;
