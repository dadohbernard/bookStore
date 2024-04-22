import React from 'react';
import '../assets/css/HeaderCss.css';

function Header({ onLoginClick, onRegisterClick, onHomeClick }) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; 
    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        window.location.reload();
    };

    return (
        <div>
            <div className='headerSticky'>
                <nav>
                    <div className="logo">
                        <img className="logo-img" src="../../images/logo/logo.png" alt="Logo" />
                    </div>
                    
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox" id="icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                    <ul>
                        <li><a href="#" className="" onClick={onHomeClick}>Home</a></li>
            
                        {isLoggedIn ? (
                            <li><a href="#" onClick={handleLogout}>Logout</a></li> 
                        ) : (
                            <>
                                <li><a href="#" onClick={onLoginClick}>Login</a></li> 
                                <li><a href="#" onClick={onRegisterClick}>Register</a></li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="line1"></div>
            </div>
            <div className="line"></div>
        </div>
    );
}

export default Header;
