import React from 'react';
import { isAuthenticated } from '../auth/index';

let user = isAuthenticated();

const MessageBoard = ({ match }) => {

    let { studentId, tutorId } = match.params

    console.log({ user });

    return (
        <h1>Tutor Name Messages</h1>
    )
}

export default MessageBoard;