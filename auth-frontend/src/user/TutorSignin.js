import React, { useState } from 'react';

const Signin = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleEmailChange = event => setEmailValue(event.target.value);
    const handlePasswordChange = event => setPasswordValue(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let result = await fetch('http://localhost:8000/api/tutor/signin', {
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
            result = await result.json();
            console.log(result)
            if (!result.error && typeof (window) !== 'undefined') {
                localStorage.setItem('jwt', JSON.stringify(result));
                window.location.reload();
            }
            // window.location.reload();
            // window.location.href = "/";
            // Redirect to user home

        } catch (error) {
            console.log(`Incorrect email or password`)
        }

    }

    return (
        <div>
            <h1>Tutor Sign in</h1>
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