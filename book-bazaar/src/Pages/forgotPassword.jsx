import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import logo from '../Assets/book_bazaar_logo.png';
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-header">
        <Link to="/">
          <img src={logo} alt="Book Bazaar Logo" className="logoForgotPassword" />
        </Link>
        <h1>Forgot Password</h1>
      </div>
      <form onSubmit={handleResetPassword} className="forgot-password-form">
        <div className="inputBoxForgotPassword">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputBoxForgotPassword">
          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="btnsForgotPassword">
        <p>
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
