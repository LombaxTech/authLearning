import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/index';

let user = isAuthenticated();

const MessageBoard = (props) => {

    let { studentId, tutorId } = props.match.params

    console.log(studentId)

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

    useEffect(() => {
        getStudentAndTutorValues();
    }, [])

    let userType = user.tutor ? 'tutor' : 'student';

    // console.log(userType);

    const [inputMessage, setInputMessage] = useState('');

    const handleInput = e => {
        setInputMessage(e.target.value);
    }

    const sendMessage = async () => {
        try {
            let result = fetch(`http://localhost:8000/api/message/${userType}/${tutorId}/${studentId}`, {
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
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>{user.tutor ? student.name : tutor.name}</h1>

            <input type="text" value={inputMessage} onChange={handleInput} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default MessageBoard;