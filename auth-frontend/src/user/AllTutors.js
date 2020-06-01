import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllTutors = () => {

    const [tutors, setTutors] = useState([]);

    async function init() {
        let tutorsData = await fetch('http://localhost:8000/api/tutors/profiles')
        tutorsData = await tutorsData.json();
        setTutors(tutorsData);
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <h1>All Tutors</h1>
            <ul>
                {tutors.map(tutor => (
                    <li key={tutor._id}>
                        <h2>{tutor.name}'s Page</h2>
                        <Link to={`/tutor/page/${tutor._id}`}>View Profile</Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default AllTutors;