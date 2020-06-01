import React from 'react';
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/index';
import Signout from './Signout';


let data = isAuthenticated();
console.log(data)

const studentMessage = student => (
    <div>
        <h1>Welcome {student.name}</h1>
        <Signout />
    </div>
)

const tutorMessage = tutor => (
    <div>
        <h1>Welcome {tutor.name}</h1>
        <ul>
            <li>
                <h2>Home</h2>
            </li>
            <li>
                <h2>Bookings</h2>
            </li>
            <li>
                <h2>Inbox</h2>
            </li>
            <li>
                <h2>Settings</h2>
            </li>
        </ul>
        <Signout />
    </div>
)

const notLoggedInMessage = () => (
    <div>
        <h1>Not Logged in</h1>
        <Link to="/tutor/signin"><h2>Tutor Sign In</h2></Link>
        <Link to="/student/signin"><h2>Student Sign In</h2></Link>
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

            {data.tutor && (
                tutorMessage(data.tutor)
            )}

            {data.student && (
                studentMessage(data.student)
            )}

            {!data && (
                notLoggedInMessage()
            )}
        </div>
    )
}

export default Home