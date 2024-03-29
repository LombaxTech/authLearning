import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index'

let data = isAuthenticated();

const TutorPage = props => {

    const [values, setValues] = useState({
        tutor: '',
        loading: true,
        error: false
    });

    let { tutor, loading, error } = values;

    async function init() {
        let tutorData = await fetch(`http://localhost:8000/api/tutors/profile/${props.match.params.tutorId}`)
        tutorData = await tutorData.json();
        setValues({
            tutor: tutorData,
            loading: false
        });
        if (tutorData.error) setValues({ ...values, error: true });
    }

    useEffect(() => {
        init();
    }, [])

    const sendMessage = () => {
        if (!data) return console.log('YOU MUST BE SIGNED IN');
        if (data.tutor) return console.log('NOT ALLOWED');
        if (data.student) window.location.href = `/messages/${tutor._id}/${data.student.id}`;
    }

    if (error) {
        return (
            <h1>Tutor doesnt exist</h1>
        )
    }
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        return (
            <div>
                <h1>{tutor.name}'s Page</h1>
                {/* <Link to={`/messages/${tutor.id}`}>home</Link> */}
                <button onClick={sendMessage}>
                    <h3>Message {tutor.name}</h3>
                </button>
            </div>
        )
    }

}

export default TutorPage;