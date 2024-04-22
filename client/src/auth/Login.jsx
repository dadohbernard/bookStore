import React, { useState } from 'react';
import '../assets/css/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('customerId');
        sessionStorage.removeItem('isLoggedIn');
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('customerId', data.customer_id); 
                setLoginSuccess(true);
                window.location.reload();
            } else {
                const error = await response.json();
                console.error('Login failed:', error.message);
                setErrorMessage(error.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='login-container'> 
            <div className='login-card'> 
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {errorMessage && <p className="error-message">Incorrect Credentials{errorMessage}</p>}
                {loginSuccess && <p>Login successful! <button onClick={handleLogout}>Logout</button></p>}
            </div>
        </div>
    );
}

export default Login;
