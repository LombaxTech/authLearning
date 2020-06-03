import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/index';
const io = require('socket.io-client');
const socket = io('http://localhost:8000');

let user = isAuthenticated();
let userType = user.tutor ? 'tutor' : 'student';

const MessageBoard = (props) => {

    let { studentId, tutorId } = props.match.params

    const [messages, setMessages] = useState([]);

    // * SOCKET STUFF

    const roomName = `${studentId}and${tutorId}`

    socket.on('connect', () => {
        socket.emit('join room', roomName)
    })

    socket.on('message', message => {
        setMessages([...messages, message])
    })

    // * SETTING STUDENT AND TUTOR VALUES

    const [studentAndTutorValues, setStudentAndTutorValues] = useState({
        student: '',
        tutor: ''
    })

    const { student, tutor } = studentAndTutorValues;

    async function getStudentAndTutorValues() {
        let tutor = await fetch(`http://localhost:8000/api/tutors/profile/${tutorId}`);
        tutor = await tutor.json()

        let student = await fetch(`http://localhost:8000/api/students/profile/${studentId}`);
        student = await student.json();

        setStudentAndTutorValues({
            student,
            tutor
        })
    }

    // * LOADING MESSAGES FROM DATABASE

    async function initMessages() {
        let result = await fetch(`http://localhost:8000/api/message/${userType}/${tutorId}/${studentId}`)
        result = await result.json();
        // console.log({ messages: result[0].messages });
        setMessages(result[0].messages)
        // console.log({ result: result[0].messages });
    }

    useEffect(() => {
        getStudentAndTutorValues();
        initMessages();
    }, [])

    // * HANDLING SEND MESSAGE BUTTON INPUT

    const [inputMessage, setInputMessage] = useState('');

    const handleInput = e => {
        setInputMessage(e.target.value);
    }

    const sendMessage = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/message/${userType}/${tutorId}/${studentId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: inputMessage
                })
            });
            result = await result.json();
            console.log(result);
            if (user.tutor) {
                socket.emit('msg', {
                    roomName,
                    message: {
                        name: user.tutor.name,
                        message: inputMessage
                    }
                })
            }
            if (user.student) {
                socket.emit('msg', {
                    roomName,
                    message: {
                        name: user.student.name,
                        message: inputMessage
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>{user.tutor ? student.name : tutor.name}</h1>
            <ul>
                {messages.map((message, i) => (
                    <li key={i}>
                        {message.name}: {message.message}
                    </li>
                ))}
            </ul>
            <input type="text" value={inputMessage} onChange={handleInput} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default MessageBoard;