import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AllTutors from './user/AllTutors';
import TutorPage from './user/TutorPage';
import Home from './user/Home';
import TutorSignin from './user/TutorSignin';
import StudentSignin from './user/StudentSignin';
import PrivateRoute from './auth/PrivateRoute';
import Private from './user/Private';
import MessageBoard from './user/MessageBoard';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tutor/signin" exact component={TutorSignin} />
        <Route path="/student/signin" exact component={StudentSignin} />
        <Route path="/tutors" exact component={AllTutors} />
        <Route path="/tutor/page/:tutorId" exact component={TutorPage} />
        <Route path="/messages/:tutorId/:studentId" exact component={MessageBoard} />
        <PrivateRoute path="/private" exact component={Private} />
      </Switch>
    </Router>
  </div>
)


export default App;
