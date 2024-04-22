import React, { useState } from 'react';
import '../assets/css/Register.css';
function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false); 
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setRegistrationSuccess(true);
            } else {
                setRegistrationSuccess(false);
            }
            console.log(data); 
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className='register-container'>
            <div className='register-card'> 
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit">Register</button>
                </form>
                {registrationSuccess && <p>Registration successful!</p>}
            </div>
        </div>
    );
}

export default Register;
