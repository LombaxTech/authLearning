import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

let user = isAuthenticated();
let userType = user.tutor ? 'tutor' : 'student'

const Inbox = () => {

    console.log({ user })

    const [chats, setChats] = useState([]);

    async function init() {
        if (user.student) {
            let result = await fetch(`http://localhost:8000/api/message/inbox/student/${user.student.id}`);
            result = await result.json();
            console.log(result);
            setChats(result)
        }
        if (user.tutor) {
            let result = await fetch(`http://localhost:8000/api/message/inbox/tutor/${user.tutor.id}`);
            result = await result.json();
            console.log(result);
            setChats(result)
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <h1>Inbox</h1>
            <ul>
                {chats.map(chat => (
                    <li key={chat._id}>
                        <Link to={`/messages/${(userType == 'tutor') ? `${user.tutor.id}/${chat.partnerId}` : `${chat.partnerId}/${user.student.id}`}`}>
                            {chat.partnerName}: {chat.messages[0].message}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Inbox;