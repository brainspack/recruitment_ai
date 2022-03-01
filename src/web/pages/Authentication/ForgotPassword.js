import React, { useState, useEffect } from 'react';
import Logo from "recruitment-images/h1.png";
import LoginBg from "recruitment-images/wallpaper.jpg";
import Input from "recruitment-components/Input/Input.js";
import { useStoreActions } from 'easy-peasy';
import Button from "recruitment-components/Button/Button.js";
const ForgotPassword = (props) => {
  const [email, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const forgetPassword = useStoreActions((actions) => actions.authentication.forgetPassword);

  const forgetUser = async () => {
    setEmailError(false);

    if (email.trim() == '') {
      setEmailError(true);
      return false;
    }
    let host = window.location.hostname;
    let domain = ''
    if (host == 'localhost') {
      domain = 'dps'
    } else {
      domain = host
    }
    setDisableButton(true);
    let formData = { domain: domain, email: email }
    let response = await forgetPassword(formData);
    setDisableButton(false);
    // if(response) {
    //   history.push('/dashboard');
    // }
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
          <div className="col-md-5 col-lg-5  loginForm">
            <form>
              <h1 className="formTitle">Forgot Password</h1>
              <Input
                label={"Email Address"}
                type={'text'}
                value={email}
                handleInputChange={(e) => setEmailAddress(e.target.value)}
                handleInputKeyPress={(event)=>(event.key === 'Enter'?forgetUser():'')}
                error={emailError}
                errorMessage={"Please enter valid email."}
              />
              <div className="row">
                <div className="col-sm-8">
                  <Button type={'theme-button'} extraClasses={`w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : forgetUser()} label={"Submit"} disableBtn={disableButton} />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/*<div className="loginFooter">
          <div className="container">
            By setting up an account you agree to our <a>Terms of Conditions</a> and <a>Privacy Policy</a>
          </div>
        </div>*/}
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
