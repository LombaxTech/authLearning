import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TutorPage = props => {

    const [values, setValues] = useState({
        tutor: '',
        loading: true,
        error: false
    });

    let { tutor, loading, error } = values;

    async function init() {
        let tutorData = await fetch(`http://localhost:8000/api/tutor/${props.match.params.tutorId}`)
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
            </div>
        )
    }

}

export default TutorPage;