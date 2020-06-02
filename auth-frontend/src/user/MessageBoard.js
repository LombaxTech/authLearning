import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/index';

let user = isAuthenticated();

const MessageBoard = ({ match }) => {

    let { studentId, tutorId } = match.params

    let userType = user.tutor ? 'tutor' : 'student';

    console.log(userType);

    const [inputMessage, setInputMessage] = useState('');

    const handleInput = e => {
        setInputMessage(e.target.value);
    }

    const sendMessage = async () => {

    }

    return (
        <div>
            <h1>Tutor Name Messages</h1>

            <input type="text" value={inputMessage} onChange={handleInput} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default MessageBoard;