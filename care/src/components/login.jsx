import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: ''
  });

  const handleLogin = (e) => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const found = users.find(
    (user) =>
      user.email === loginData.email && user.password === loginData.password
  );

  if (found) {
    localStorage.setItem('loggedInUser', JSON.stringify(found));
    // Instead of window.location.href, use navigate if using React Router
    window.location.href = '/getCare'; // or your dashboard route
  } else {
    alert('Invalid email or password!');
  }
};


  const handleSignup = (e) => {
    e.preventDefault();
    const { username, email, password, repassword } = signupData;

    if (password !== repassword) {
      alert('Passwords do not match!');
      return;
    }

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !repassword.trim() ||
      !email.includes('@')
    ) {
      alert('Please fill all fields correctly.');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.some((user) => user.email === email);

    if (exists) {
      alert('Email already registered!');
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registered successfully!');
    setIsSignup(false);
  };

  return (
    <div className="loginbody">
      <div className="overlay-login"></div>
      <div className="user">
        <h1><a href="/">VitalLink</a></h1>
      </div>

      {!isSignup ? (
        <div className="login-card">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="username">
              <input
                type="email"
                placeholder="Enter your Email Address"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="Enter your Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>
            <label className="term">
              <input type="checkbox" required /> Agree with{' '}
              <a href="#">Terms & Conditions</a>
            </label>
            
           
            <button className="button1" type="submit">
              Sign In
            </button>
            <br />
            <label className="button2">
              Don’t have an account?
              <a href="#" className="register" onClick={() => setIsSignup(true)}>
                {' '}
                Register
              </a>
            </label>
          </form>
       
        </div>
      ) : (
        <div className="signup">
          <form onSubmit={handleSignup}>
            <h1>Signup</h1>
            <div className="Username">
              <input
                type="text"
                placeholder="Enter Username"
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
                required
              />
            </div>
            <div className="Email">
              <input
                type="email"
                placeholder="Enter Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="Password">
              <input
                type="password"
                placeholder="Create Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="Repassword">
              <input
                type="password"
                placeholder="Confirm Password"
                value={signupData.repassword}
                onChange={(e) =>
                  setSignupData({ ...signupData, repassword: e.target.value })
                }
                required
              />
            </div>
            <label className="term">
              <input type="checkbox" required /> Agree with{' '}
              <a href="#">Terms & Conditions</a>
            </label>
            <br />
        
        <div class="button-reg">
            <button className="reg" type="submit">
              Register
            </button>
            <button
              className="back-to-login"
              type="button"
              onClick={() => setIsSignup(false)}
            >
              Sign In
            </button>
         </div>
         
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;