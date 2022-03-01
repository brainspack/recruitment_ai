import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Logo from "recruitment-images/h1.png";
import LoginBg from "recruitment-images/wallpaper.jpg";
import Input from "recruitment-components/Input/Input.js";
import { useStoreActions } from 'easy-peasy';
import {ERROR_INVALID_PASSWORD, ERROR_PASSWORD_NOT_MATCH } from 'recruitment-message';
import Button from "recruitment-components/Button/Button.js";
function ResetPassword(props) {
    const history =  useHistory();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const resetPassword = useStoreActions((actions) => actions.authentication.resetPassword);

    const resetUser = async () => {
        setPasswordError(false);
        setConfirmPasswordError(false);
        if (password.trim() == '') {
            setPasswordError(true);
            return false;
        }
        if(confirmPassword!==password){
            setConfirmPasswordError(true);
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
        let formData = { domain: domain,forgot_password_token:props.match.params.token,password:password}
        let response = await resetPassword(formData);
        setDisableButton(false);
        if(response) {
          history.push('/login');
        }
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
                        <h1 className="formTitle">Set a new password</h1>
                        <Input
                            label={"Password"}
                            type={'password'}
                            value={password}
                            // placeholder={"Password"}
                            handleInputChange={(e) => setPassword(e.target.value)}
                            handleInputKeyPress={(event)=>(event.key === 'Enter'|| !disableButton)?resetUser():''}
                            error={passwordError}
                            errorMessage={ERROR_INVALID_PASSWORD}
                        />
                        <Input
                            label={"Confirm Password"}
                            type={'password'}
                            value={confirmPassword}
                            // placeholder={"Password"}
                            handleInputChange={(e) => setConfirmPassword(e.target.value)}
                            handleInputKeyPress={(event)=>(event.key === 'Enter'?resetUser():'')}
                            error={confirmPasswordError}
                            errorMessage={ERROR_PASSWORD_NOT_MATCH}
                        />
                        <div className="row">
                            <div className="col-sm-8">
                                <Button type={'theme-button'} extraClasses={`w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : resetUser()} label={"Submit"} disableBtn={disableButton} />
                            </div>
                        </div>
                        <a className="goBack" onClick={()=>{history.goBack()}}><i className="uil uil-arrow-left"></i> Go back</a>
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
    )
}

export default ResetPassword
