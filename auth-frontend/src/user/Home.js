import React from 'react';
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/index';
import Signin from './Signin';
import Signout from './Signout';

let data = isAuthenticated();
console.log(data)

const loggedInMessage = user => {

    return (
        <div>
            <h1>Welcome {user.name}</h1>
            <Signout />
        </div>
    )
}

const notLoggedInMessage = () => (
    <div>
        <h1>Not Logged in</h1>
        <Link to="/signin"> <h1>Sign in</h1></Link>
    </div>
)

const Home = () => {

    // if (data) return (
    //     <TutorHomepage />
    // )
    // if (!data) return (
    //     <h1>Not signed in</h1>
    // )

    return (
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
}

export default Home