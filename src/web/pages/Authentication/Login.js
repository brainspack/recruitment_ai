import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Logo from "recruitment-images/h1.png";
import LoginBg from "recruitment-images/wallpaper.jpg";
import Input from "recruitment-components/Input/Input.js";
import Button from "recruitment-components/Button/Button.js";
import Cookies from 'js-cookie';
import OtpInput from 'react-otp-input'
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import {validateEmail} from "recruitment-validation";
import { useStoreActions } from 'easy-peasy';
import { ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD } from 'recruitment-message';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {

  const history = useHistory();
  const [email, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [MFA, setMFA] = useState(false)
  const [otp, setOtp] = useState("")
  const loginUser = useStoreActions((actions) => actions.authentication.loginUser);
  const browserData = useStoreActions((actions) => actions.authentication.browserDATA);
  const submitOTP = useStoreActions((actions) => actions.authentication.submitOTP);
  const resendOTP = useStoreActions((actions) => actions.authentication.resendOTP);
  const [needMFA, setNeedMFA] = useState(true)
  const [userData, setUserData] = useState("")
  const secretKeyAdmin = "JdfvibauJbvVkwgKGY41864GCgvbufsdjvb5fsv4wguvHFFfbu5269"

  const checkCookie = async () => {
    const cookiee = Cookies.get('__MFToken')
    if (cookiee) {
      if (cookiee === secretKeyAdmin) {
        await setNeedMFA(false)
        return
      }
    }
    await setNeedMFA(true)
  }
  useEffect(() => {
    checkCookie()
  }, [])

  const authenticateUser = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (email.trim() == '' || !validateEmail(email)) {
      setEmailError(true);
      return false;
    }
    if (password.trim() == '') {
      setPasswordError(true);
      return false;
    }
    
    setDisableButton(true);
    await checkCookie()
    let formData = { email: email, password: password }
    let response = await loginUser(formData);
    console.log(response);
    //setUserData(response)
    setDisableButton(false);
    if (response) {
      browserData(response);
      history.push('/dashboard');
    }
  }
  const enteredOTP = async () => {
    if (otp.trim().length !== 6) {
      toast.error(<ToastUI message={"Enter Valid OTP"} type={"Error"} />)
      return false
    }
    let host = window.location.hostname;
    let domain = ''
    if (host == 'localhost') {
      domain = 'dev'
    } else {
      domain = host
    }
    let formData = { otp: otp, domain: domain, user_type: 'admin', id: userData.id }
    setDisableButton(true);
    let response = await submitOTP(formData)
    if (response) {
      Cookies.set('__MFToken', secretKeyAdmin, { expires: 7, path: '' })
      browserData(userData)
      setDisableButton(false);
      history.push('/dashboard');
      return
    }
    setDisableButton(false);
    setOtp("")
  }
  const Entered = (e) => {
    if (e.key === 'Enter') {
      enteredOTP()
    }
  }
  const reesendOTP = async () => {
    let host = window.location.hostname;
    let domain = ''
    if (host == 'localhost') {
      domain = 'dev'
    } else {
      domain = host
    }
    let formData = { domain: domain, user_type: 'admin', id: userData.id }
    await resendOTP(formData)
  }
 
  return (
    <React.Fragment>
      <a className="loginLogo"><img src={Logo} /></a>
      {/*<h2 className="loginLogo formTitle">Recruitment AI</h2>*/}
      <div className="container GuestOuter">
        <div className="row white-bg">
          <div className="col-md-7 col-lg-7  loginImgLeft">
            <img src={LoginBg} />
          </div>
            <>
              <div className="col-md-5 col-lg-5  loginForm">
                <form>
                  <h1 className="formTitle">Log In</h1>
                  <Input
                    label={"Email Address"}
                    type={'text'}
                    value={email}
                    handleInputChange={(e) => setEmailAddress(e.target.value)}
                    handleInputKeyPress={(event) => (event.key === 'Enter' ? authenticateUser() : '')}
                    error={emailError}
                    placeholder={"Email address"}
                    errorMessage={ERROR_INVALID_EMAIL}
                  />
                  <Input
                    label={"Password"}
                    type={'password'}
                    value={password}
                    placeholder={"Password"}
                    handleInputChange={(e) => setPassword(e.target.value)}
                    handleInputKeyPress={(event) => (event.key === 'Enter' ? authenticateUser() : '')}
                    error={passwordError}
                    errorMessage={ERROR_INVALID_PASSWORD}
                  />
                  <div className="formFieldOuter forgotPwd">
                    <a onClick={()=>history.push("/forgot-password")}>Forgot Password?</a>
                  </div>
                  <div className="row">
                    <div className="col-sm-8">
                      <Button type={'theme-button'} extraClasses={`w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : authenticateUser()} label={"Log In"} disableBtn={disableButton} />
                    </div>
                  </div>
                </form>
              </div>
            </>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
    </React.Fragment>
  );
};

export default Login;
