import React, { useState } from 'react';

const Signin = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleEmailChange = event => setEmailValue(event.target.value);
    const handlePasswordChange = event => setPasswordValue(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let result = await fetch('http://localhost:8000/api/signin', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            });
            result = await result.json()
            if (!result.error && typeof (window) !== 'undefined') {
                localStorage.setItem('jwt', JSON.stringify(result));
            }
            // Redirect to user home

        } catch (error) {
            console.log(`Incorrect email or password`)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input onChange={handleEmailChange} value={emailValue} type="text" />

                <label>Password: </label>
                <input onChange={handlePasswordChange} value={passwordValue} type="password" />

                <button>Sign in</button>
            </form>
        </div>
    )
}

export default Signin;