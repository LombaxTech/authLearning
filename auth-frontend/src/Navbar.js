import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './auth/index';

const data = isAuthenticated();

const Navbar = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/tutors">Tutors</Link>
            </li>

            {!data && (
                <li>
                    <Link to="/">Sign in</Link>
                </li>
            )}

            {data && (
                <li>
                    <Link to="/inbox">Inbox</Link>
                </li>
            )}

        </ul>
    </nav>
)

export default Navbar;