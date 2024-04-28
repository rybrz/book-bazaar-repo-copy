import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import SignUp from './Pages/signup';
import Login from './Pages/login';
import Protected from './Components/protected.jsx';
import Home from './Pages/home';
import ForgotPassword from './Pages/forgotPassword.jsx';
import MyListings from './Pages/myListings.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="/" element={<Protected />}> */}
      <Route path="/" index element={<Home />} />
      <Route path="/forgot-password" Component={ForgotPassword} />
      <Route path="my-listings" element={<MyListings />} />

      {/* </Route> */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
