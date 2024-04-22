import React, { useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleHomeClick = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="App">
      <Header 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onHomeClick={handleHomeClick} 
      />
      {!showLogin && !showRegister && <Card />}
      {showLogin && <Login />}
      {showRegister && <Register />}
    </div>
  );
}

export default App;
