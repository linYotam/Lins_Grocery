// import axios from 'axios';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import CallToast from '../Toaster/CallToaster';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser, logoutUser } from '../../actions/authActions';
import { useSelector } from 'react-redux';

var key = CryptoJS.enc.Utf8.parse('8080808080808080');
var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

const Auth = ({ closeSignPage }) => {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRePassword, setRegisterRePassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [typeRegPass, setRegPassType] = useState('password');
  const [typeReRegPass, setReRegPassType] = useState('password');
  const [typeSignPass, setSignPassType] = useState('password');
  const dispatch = useDispatch();
  const userName = useSelector(state => state.auth.user.name);

  const toggleSign = () => {
    document.querySelector('.cont').classList.toggle('s--signup');
  };

  const encryptPassword = password => {
    var encryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encryptedPassword.toString();
  };

  const handleRegistration = async e => {
    e.preventDefault();

    if (registerPassword !== registerRePassword) {
      CallToast('Please make sure you use the same password.', 'error');
      return;
    }

    const encryptedPassword = encryptPassword(registerPassword);

    const registrationData = {
      Name: registerName,
      Email: registerEmail,
      password: encryptedPassword,
      Type: 'customer',
    };

    dispatch(registerUser(registrationData))
      .then(() => {
        // Registration successful, perform any necessary actions
        // e.g., redirect to a different page
      })
      .catch(error => {
        // Registration failed, handle the error
        console.log('Registration Error:', error);
      });
  };

  const handleLogin = async e => {
    e.preventDefault();

    const encryptedPassword = encryptPassword(loginPassword);
    // console.log('Login: ', encryptedPassword);

    const loginData = {
      Email: loginEmail,
      password: encryptedPassword,
    };

    dispatch(loginUser(loginData))
      .then(() => {
        // Login successful, perform any necessary actions
        // e.g., redirect to a different page
      })
      .catch(error => {
        // Login failed, handle the error
        console.log('Login Error:', error);
      });
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        // Logout successful, perform any necessary actions
        // e.g., redirect to the login page
      })
      .catch(error => {
        // Logout failed, handle the error
        console.log('Logout Error:', error);
      });
  };

  const togglePassword = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();

    switch (fieldName) {
      case 'Reg':
        setRegPassType(typeRegPass === 'input' ? 'password' : 'input');
        break;
      case 'ReReg':
        setReRegPassType(typeReRegPass === 'input' ? 'password' : 'input');
        break;
      case 'Login':
        setSignPassType(typeSignPass === 'input' ? 'password' : 'input');
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="sign">
        <div className="sign__wrapper">
          <div className="cont">
            <div className="full-img">
              <div className="full-img__text-header">
                <div className="left"></div>
                <div className="right">
                  <h2 className="sign__header">Welcome back, {userName}</h2>
                  <button type="button" className="signBtn logout" onClick={handleLogout}>
                    Sign Out
                  </button>
                  <div className="img__btn img__exit-btn" onClick={closeSignPage}>
                    <span className="m--up">Cancel</span>
                    <span className="m--in">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="sign">
        <div className="sign__wrapper">
          <div className="cont">
            <form className="form sign-in" onSubmit={handleLogin}>
              <h2 className="sign__header">Welcome back,</h2>
              <label className="sign__label">
                <input
                  type="email"
                  value={loginEmail}
                  required
                  className="sign__input"
                  placeholder="Enter email"
                  onChange={e => setLoginEmail(e.target.value)}
                />
              </label>
              <label className="sign__label">
                <input
                  type={typeSignPass}
                  value={loginPassword}
                  required
                  placeholder="Enter password"
                  className="sign__input"
                  onChange={e => setLoginPassword(e.target.value)}
                  autoComplete="off"
                />
                {typeSignPass === 'password' && (
                  <VisibilityOffOutlined className="password__show" onClick={e => togglePassword(e, 'Login')}>
                    {typeSignPass === 'input' ? 'Hide' : 'Show'}
                  </VisibilityOffOutlined>
                )}

                {typeSignPass === 'input' && (
                  <VisibilityOutlined className="password__show" onClick={e => togglePassword(e, 'Login')}>
                    {typeSignPass === 'input' ? 'Hide' : 'Show'}
                  </VisibilityOutlined>
                )}
              </label>
              <p className="forgot-pass">Forgot password?</p>
              <button type="submit" className="signBtn submit">
                Sign In
              </button>
              <button type="button" className="signBtn logout" onClick={handleLogout}>
                Sign Out
              </button>
            </form>
            <div className="sub-cont">
              <div className="img">
                <div className="img__text m--up">
                  <h2 className="sign__header">New here?</h2>
                  <p>Sign up and discover the best ingredients for your next luxurious meal. </p>
                </div>
                <div className="img__text m--in">
                  <h2 className="sign__header">One of us?</h2>
                  <p>If you already has an account, just sign in. We've missed you!</p>
                </div>
                <div className="img__btn" onClick={toggleSign}>
                  <span className="m--up">Sign Up</span>
                  <span className="m--in">Sign In</span>
                </div>
                <div className="img__btn img__exit-btn" onClick={closeSignPage}>
                  <span className="m--up">Cancel</span>
                  <span className="m--in">Cancel</span>
                </div>
              </div>
              <form className="form sign-up" onSubmit={handleRegistration}>
                <h2 className="sign__header">Time to feel like home,</h2>
                <label className="sign__label">
                  <input
                    type="text"
                    className="sign__input"
                    value={registerName}
                    placeholder="Enter name"
                    required
                    onChange={e => setRegisterName(e.target.value)}
                  />
                </label>
                <label className="sign__label">
                  <input
                    type="email"
                    className="sign__input"
                    placeholder="Enter email"
                    value={registerEmail}
                    required
                    onChange={e => setRegisterEmail(e.target.value)}
                  />
                </label>
                <label className="sign__label">
                  <input
                    type={typeRegPass}
                    className="sign__input"
                    placeholder="Enter password"
                    value={registerPassword}
                    required
                    onChange={e => setRegisterPassword(e.target.value)}
                    autoComplete="off"
                  />
                  {typeRegPass === 'password' && (
                    <VisibilityOffOutlined className="password__show" onClick={e => togglePassword(e, 'Reg')}>
                      {typeRegPass === 'input' ? 'Hide' : 'Show'}
                    </VisibilityOffOutlined>
                  )}

                  {typeRegPass === 'input' && (
                    <VisibilityOutlined className="password__show" onClick={e => togglePassword(e, 'Reg')}>
                      {typeRegPass === 'input' ? 'Hide' : 'Show'}
                    </VisibilityOutlined>
                  )}
                </label>
                <PasswordStrengthBar password={registerPassword} className="sign__strangth" />

                <label className="sign__label">
                  <input
                    type={typeReRegPass}
                    className="sign__input"
                    placeholder="Re-Enter password"
                    value={registerRePassword}
                    required
                    onChange={e => setRegisterRePassword(e.target.value)}
                    autoComplete="off"
                  />
                  {typeReRegPass === 'password' && (
                    <VisibilityOffOutlined className="password__show" onClick={e => togglePassword(e, 'ReReg')}>
                      {typeReRegPass === 'input' ? 'Hide' : 'Show'}
                    </VisibilityOffOutlined>
                  )}

                  {typeReRegPass === 'input' && (
                    <VisibilityOutlined className="password__show" onClick={e => togglePassword(e, 'ReReg')}>
                      {typeReRegPass === 'input' ? 'Hide' : 'Show'}
                    </VisibilityOutlined>
                  )}
                </label>
                <button type="submit" className="signBtn submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div> */}
    </>
  );
};

export default Auth;
