import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Assets/book_bazaar_logo.png';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error.message);
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="container">
      <div className="drop">
        <div className="content">
          <h1>Login</h1>
          <Link to="/">
            <img src={logo} alt="" className="logoLogin" />
          </Link>
          <form onSubmit={handleLogin} className="login-form">
            {/* INPUT FOR EMAIL */}
            <div className="inputBox">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* INPUT FOR PASSWORD */}
            <div className="inputBox">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ERROR MESSAGE */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* LOGIN BUTTON */}
            <div className="inputBox">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>

          {/* FORGOT PASSWORD */}
          <div className="forgot-password">
            <Link to="/forgot-password">
              <button className="forgot-password-button">Forgot Password?</button>
            </Link>
          </div>

          {/* SIGNUP LINK */}
          <div className="signup-bubble">
            <Link to="/signup">
              <button className="signup-button-bubble">SignUp</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
