import React from 'react';
import Signin from './user/Signin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tutors" exact component={AllTutors} />
        <Route path="/tutor/:tutorId/:studentId" exact component={TutorPage} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  </div>
)

const Home = () => (
  <div>
    <Signin />
    <h1>Home</h1>
  </div>
)

const AllTutors = () => (
  <div>
    <h1>All Tutors</h1>
  </div>
)

const TutorPage = props => (
  <div>
    <h1>
      Tutor's Page
    </h1>

  </div>
)

export default App;
