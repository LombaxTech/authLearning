import React from 'react';
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/index';

let data = isAuthenticated();
console.log(data)

const loggedInMessage = user => <h1>Welcome {user.name}</h1>
const notLoggedInMessage = () => <h1>Not Logged in</h1>

const Home = () => (
    <div>
        <h1>Home</h1>
        <Link to={`/tutors`}>View Tutors</Link>

        {data && (
            loggedInMessage(data.user)
        )}

        {!data && (
            notLoggedInMessage()
        )}
    </div>
)

export default Home