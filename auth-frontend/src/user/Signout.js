import React, { useState } from 'react';

const Signout = () => {

    const logout = async (event) => {
        try {
            const result = await fetch('http://localhost:8000/api/signout');
            console.log('result');
            localStorage.removeItem('jwt');
            window.location.reload();
        } catch (error) {
            console.log(`error of: ${error}`)
        }
    }

    return (
        <button onClick={logout}>Log Out</button>
    )
}

export default Signout