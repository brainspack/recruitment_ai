import React, { useState, useEffect } from 'react';
import { Link , useHistory } from "react-router-dom";
import { isPhoneNumberValid } from 'recruitment-utils/Validators.js';
import Sidebar from "recruitment-components/Sidebar/Sidebar.js";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Input from "recruitment-components/Input/Input.js";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import Button from "recruitment-components/Button/Button.js";
import ToggleSwitch from "recruitment-components/ToggleSwitch/ToggleSwitch.js";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import validator from "validator";
import { apiDateFormat, logoutCompletely } from 'recruitment-utils/Service.js';
import { ERROR_INVALID_EMAIL, FIRSTNAME_ERROR_MESSAGE, LASTNAME_ERROR_MESSAGE, ERROR_ADDRESS, ERROR_INVALID_DOB, ERROR_INVALID_PHONE, ERROR_INVALID_CURRENT_PASSWORD, ERROR_INVALID_NEW_PASSWORD, ERROR_INVALID_CONFIRM_NEW_PASSWORD, ERROR_PASSWORD_MISMATCH } from 'recruitment-message';
import Overlay from "recruitment-components/Overlay/Overlay.js";
import moment from 'moment';
import EditPasswordImg from "recruitment-images/atoms-icons-system-pen-solid.svg"

const Profile = (props) => {
  const history = useHistory();
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // const {localStorageData} = useLocalStorage();
  const [showLoader, setShowLoader] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [forenameError, setForenameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showChangeProfile, setShowProfile] = useState(false);
  const [avtarGenderMale, setAvtarGenderMale] = useState(true);
  const [selectedAvtar, setSelectedAvtar] = useState("");
  const [mf_status, setmf_status] = useState(0)
  const [mf_type, setmf_type] = useState("")
  //const setShowProgressBar = useStoreActions((actions) => actions.classimize.setShowProgressBar);
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const allAvtars = useStoreState((state) => state.admin.allAvtars);
  const updateProfile = useStoreActions((actions) => actions.admin.updateProfile);
  const getUserProfile = useStoreActions((actions) => actions.admin.getUserProfile);
  const getAllAvtars = useStoreActions((actions) => actions.admin.getAllAvtars);
  const assignAvtarToAdmin = useStoreActions((actions) => actions.admin.assignAvtarToAdmin);
  const changePassword = useStoreActions((actions) => actions.admin.changePassword);
  const [displayAvtar, setDisplayAvtar] = useState([]);
  const [pager, setPager] = useState({});
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMisMatchError, setPasswordMisMatchError] = useState(false);
  const [changeSignIn, setChangeSignIn] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [disabledButton, setDisaledButton] = useState(false);
  const [profileImg, setProfileImg] = useState(JSON.parse(localStorage.getItem('loggedInUser')).image_url);
  useEffect(async () => {
    setShowLoader(true);
    await getUserProfile();
    setShowLoader(false);
  }, [avtarGenderMale])
  useEffect(() => {

  }, [localStorage])
  useEffect(() => {
    if (userProfile) {
      setForename(userProfile.first_name)
      setSurname(userProfile.last_name)
      setEmail(userProfile.email);

      if (userProfile.dob) {
        var date = moment(userProfile.dob, 'DD/MM/YYYY').format('MM/DD/YYYY');
        setDob(new Date(date));
      } else {
        setDob(new Date());
      }

      setPhone(userProfile.phone_number)
      setAddress(userProfile.address)
      setProfileImg(userProfile.image_url)
      setmf_status(userProfile.mf_status)
      setmf_type(userProfile.mf_type)
    }
  }, [userProfile])

  useEffect(() => {
    setPage(1);
  }, [allAvtars, avtarGenderMale]);

  const setPage = (page) => {
    if (!allAvtars) {
      return;
    }
    let items;
    if (avtarGenderMale) {
      items = allAvtars.male
    }
    else {
      items = allAvtars.female
    }
    let tempPager = pager;
    if (page < 1 || page > tempPager.totalPages) {
      return;
    }
    // get new pager object for specified page
    tempPager = getPager(items.length, page);
    // get new page of items from items array
    const pageOfItems = items.slice(
      tempPager.startIndex,
      tempPager.endIndex + 1
    );
    // update state
    setPager(tempPager);
    // call change page function in parent component
    setDisplayAvtar(pageOfItems);
  };
  const getPager = (totalItems, currentPage) => {

    currentPage = currentPage || 1; // default to first page

    const pageSize = 12; // default page size is 12

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;

    if (totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 5 total pages so calculate start and end pages
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage > totalPages - 2) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };

  const onClickSetPassword = async() => {
    setCurrentPasswordError(false);
    setNewPasswordError(false);
    setConfirmPasswordError(false);
    setPasswordMisMatchError(false);

    if(currentPassword.trim() == '') {
      setCurrentPasswordError(true);
      return false;
    }
    if(newPassword.trim() == '') {
      setNewPasswordError(true);
      return false;
    }
    if(confirmPassword.trim() == '') {
      setConfirmPasswordError(true);
      return false;
    }
    if(confirmPassword.trim() != newPassword.trim()) {
      setPasswordMisMatchError(true);
      return false;
    }
    
    setDisableSaveButton(true);
    let formData = { force_logout: changeSignIn, old_password: currentPassword, password: newPassword, password_confirmation: confirmPassword }
    let response = await changePassword(formData);
    setDisableSaveButton(false);
    setShowChangePassword(false)
    
    if (response) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      if(changeSignIn === true) {
        setTimeout(() => {
          logoutCompletely();
          history.push('/login');
        }, 3000);
      }
    }
  }

  const handleChangeSignIn = (e) => {
    const { checked } = e.target
    setChangeSignIn(checked)
  }

  const handlePhoneChange = (event) => {
    var phoneRegExp = /^-?\d+$/;
    const value = event.target.value
    if (value.match(phoneRegExp) || value === "") {
      setPhoneError(false)
      setPhone(value);
    }
    else {
      setPhone(value);
      setPhoneError(true)
    }
  }

  const saveProfile = async () => {
    setEmailError(false);
    setForenameError(false);
    setSurnameError(false);
    setAddressError(false);
    setDobError(false);
    setPhoneError(false);
    if (!forename || forename.trim() == '') {
      setForenameError(true);
      return false;
    }

    if (!surname || surname.trim() == '') {
      setSurnameError(true);
      return false;
    }

    if (!email || email.trim() == '' || !validator.isEmail(email)) {
      setEmailError(true);
      return false;
    }
    if (phone.trim() != '' && phoneError) {
      setPhoneError(true);
      return false;
    }

    if (dob == '' || dobError) {
      setDobError(true);
      return false;
    }

    if (!address || address.trim() == '') {
      setAddressError(true);
      return false;
    }

    if (forename && forename.trim() != '') {
      let formData = {
        "first_name": forename,
        "last_name": surname,
        "email": email,
        "dob": apiDateFormat(dob),
        "phone_number": phone,
        "address": address,
        "city": "",
        "state": "",
        "zip": "",
        "mf_status": mf_status,
        "mf_type": mf_type
      }
      setDisableButton(true)

      //  alert(editStudentId);
      let response = await updateProfile(formData);
      setDisableButton(false);
      if (response) {
        // history.push('/students');
      }
    }
  }
  const onClickEditProfile = async (event) => {
    setShowLoader(true);
    let formData = { params: { type: "admin" } }
    await getAllAvtars(formData)
    setShowProfile(true)
    setShowLoader(false);
  }
  const onClickSetAvtar = async () => {
    setDisaledButton(true)
    let response = await assignAvtarToAdmin({ id: selectedAvtar });
    if (response) {
      setTimeout(() => {
        let user = JSON.parse(localStorage.getItem('loggedInUser'))
        user['image_url'] = response.data.image_url;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
      }, 1500);
    }
    await getUserProfile();
    setDisaledButton(false);
    setShowProfile(false);
  }
  const checkedState = (val) => {
    if (val) {
      setmf_status(1)
    } else {
      setmf_status(0)
      setmf_type("")
    }
  }
  return (
    <React.Fragment>
      {showLoader &&
        <CustomLoader />
      }
      <h1 className="pageTitle">My Profile    <Button type={'top-button'} extraClasses={`float-right mt-3 ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : saveProfile()} label={"Save Changes"} disableBtn={disableButton} /></h1>
      <h1 className="pageTitle mb-4 mt-5"><div className="pr-4">
        <div className="userImgOuter" onClick={onClickEditProfile}>
          {/* <span style={{ background: 'url({`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(data.name)))}`)' }}><i className="fa fa-pen"></i></span> */}
          <span style={{ background: `url(${'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(profileImg)))})` }}><i className="fa fa-pen"></i></span>
          <h2>{forename} {surname}</h2>
        </div>
      </div></h1>
      <div className="row">
        <div className="col-sm-5">
          <div className="profileTitle">
            <span>My Details</span>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={"Forename"}
                type={'text'}
                value={forename}
                handleInputChange={(e) => setForename(e.target.value)}
                error={forenameError}
                placeholder={"Forename"}
                errorMessage={FIRSTNAME_ERROR_MESSAGE}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={"Surname"}
                type={'text'}
                value={surname}
                handleInputChange={(e) => setSurname(e.target.value)}
                error={surnameError}
                placeholder={"Surname"}
                errorMessage={LASTNAME_ERROR_MESSAGE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Input
                label={"Email"}
                type={'text'}
                value={email}
                handleInputChange={(e) => setEmail(e.target.value)}
                error={emailError}
                placeholder={"Email"}
                errorMessage={ERROR_INVALID_EMAIL}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <CustomDatepicker
                label={"Date of Birth (DD/MM/YYYY)"}
                value={dob}
                handleDateChange={(date) => setDob(date)}
                placeholder={"Date of Birth"}
                error={dobError}
                errorMessage={ERROR_INVALID_DOB}
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <CustomMobile
                label={"Phone Number (Optional)"}
                value={phone}
                handlePhoneChange={(event) => handlePhoneChange(event)}
                error={phoneError}
                placeholder={"Phone number"}
                errorMessage={ERROR_INVALID_PHONE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Textarea
                label={"Address"}
                type={'text'}
                value={address}
                handleInputChange={(e) => setAddress(e.target.value)}
                error={addressError}
                placeholder={"Address"}
                errorMessage={ERROR_ADDRESS}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-1"></div>
        <div className="col-sm-5">
          <div className="formTitle titleWithAction">
            <span>Password & Security</span>
            <a className="borderAction" onClick={(e) => setShowChangePassword(true)}><img src={EditPasswordImg} /></a>
          </div>
          <div className="profileTitle titleWithAction">
            <span>Multi-Factor Authentication</span>
            <label className="SwitchAction">
              <ToggleSwitch Name="switch1" checked={mf_status === 1 ? true : false} onChange={checkedState} />
            </label>
          </div>
          <p className="fieldLabel">Upon turning this on, you'll be required to confirm your identity through your selected channel.</p>
          {mf_status === 1 &&
            <div className="fieldLabel titleWithAction">
              <span>Email Address</span>
              <input type="radio" className="SwitchAction" value="Email" name="MFA" checked={mf_type === "email"} onChange={() => setmf_type("email")} /><br />
              <div className="mt-4">
              <span>Phone</span>
              <input type="radio" className="SwitchAction" value="Phone" name="MFA" checked={mf_type === "phone"} onChange={() => setmf_type("phone")} />
              </div>
            </div>
          }
        </div>
      </div>
      {showChangeProfile &&
        <Overlay
          title={'Change avatar'}
          subTitle={'Select an avatar from below'}
          closeOverlay={() => setShowProfile(false)}
          cancelOverlay={() => setShowProfile(false)}
          submitOverlay={() => onClickSetAvtar()}
          disableBtn={disabledButton}
        >
          <div className="avatarMain">
            {pager.currentPage !== 1 && <a className="avatarArrow left" onClick={(e) => {
              setPage(pager.currentPage - 1);
            }}><i className="uil uil-angle-left"></i></a>}
            <div className="mx-auto" style={{ width: "fit-content" }}>
              {avtarGenderMale && <button className={"mx-4 p-1"} style={{ backgroundColor: "transparent", borderColor: "transparent", borderBottomColor: "rgb(68 61 129)" }} onClick={() => { setAvtarGenderMale(true) }}>
                <h6 style={{ color: "#0c0058" }}><b>Male</b></h6>
              </button>}
              {!avtarGenderMale && <button className={"mx-4 p-1"} style={{ backgroundColor: "transparent", borderColor: "transparent" }} onClick={() => { setAvtarGenderMale(true) }}>
                <h6 style={{ color: "#0c0058" }}><b>Male</b></h6>
              </button>}
              {!avtarGenderMale && <button className="mx-4 p-1" style={{ backgroundColor: "transparent", borderColor: "transparent", borderBottomColor: "rgb(68 61 129)" }} onClick={() => { setAvtarGenderMale(false) }}>
                <h6 style={{ color: "#0c0058" }}><b>Female</b></h6>
              </button>}
              {avtarGenderMale && <button className="mx-4 p-1" style={{ backgroundColor: "transparent", borderColor: "transparent" }} onClick={() => { setAvtarGenderMale(false) }}>
                <h6 style={{ color: "#0c0058" }}><b>Female</b></h6>
              </button>}
            </div>
            <div>

              <div className="avatarOuter mt-5">
                {avtarGenderMale && allAvtars && displayAvtar.map((data, idx) => {
                  return (
                    <>{
                      selectedAvtar == data.id ?
                        <div className="avatar m-2" id={`item_${idx}`} onClick={(e) => { setSelectedAvtar(data.id) }}><img style={{ filter: "brightness(0.4)" }} src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(data.name)))}`} />
                          <i style={{ position: "absolute", transform: 'translate(-135%, 40%)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" className="bi bi-check" viewBox="0 0 16 16">
                              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                          </i>
                        </div> :
                        <div className="avatar m-2" id={`item_${idx}`} onClick={(e) => { setSelectedAvtar(data.id) }}><img src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(data.name)))}`} /></div>
                    }
                    </>
                  )
                })}
                {!avtarGenderMale && allAvtars && displayAvtar.map((data, idx) => {
                  return (
                    <>
                      {
                        selectedAvtar == data.id ?
                          <div className="avatar m-2" id={`item_${idx}`} onClick={(e) => { setSelectedAvtar(data.id) }}><img style={{ filter: "brightness(0.4)" }} src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(data.name)))}`} />
                            <i style={{ position: "absolute", transform: 'translate(-135%, 40%)' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" className="bi bi-check" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                              </svg>
                            </i>
                          </div> :
                          <div className="avatar m-2" id={`item_${idx}`} onClick={(e) => { setSelectedAvtar(data.id) }}><img src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(data.name)))}`} /></div>
                      }
                    </>
                  )
                })}
              </div>

            </div>
            {pager.currentPage !== pager.totalPages && <a className="avatarArrow right" onClick={(e) => {
              setPage(pager.currentPage + 1);
            }}><i className="uil uil-angle-right"></i></a>}
          </div>
        </Overlay>
      }
      {showChangePassword &&
      <Overlay
          title={'Change Password'}
          closeOverlay={() => setShowChangePassword(false)}
          cancelOverlay={() => setShowChangePassword(false)}
          submitOverlay={() => onClickSetPassword()}
          disableBtn={disableSaveButton}
        >
          <div className="row mb-4">
            <div className="col-lg-12">
              <Input
                label={"Current Password"}
                type={'password'}
                value={currentPassword}
                handleInputChange={(e) => setCurrentPassword(e.target.value)}
                error={currentPasswordError}
                errorMessage={ERROR_INVALID_CURRENT_PASSWORD}
                preview={true}
                autoComplete={`false`}
              />
            </div>
            <div className="col-lg-12">
              <Input
                label={"New Password"}
                type={'password'}
                value={newPassword}
                handleInputChange={(e) => setNewPassword(e.target.value)}
                error={newPasswordError}
                errorMessage={ERROR_INVALID_NEW_PASSWORD}
                preview={true}
                autoComplete={`false`}
              />
            </div>
            <div className="col-lg-12">
              <Input
                label={"Confirm New Password"}
                type={'password'}
                value={confirmPassword}
                handleInputChange={(e) => setConfirmPassword(e.target.value)}
                error={passwordMisMatchError === true ? passwordMisMatchError : confirmPasswordError}
                errorMessage={passwordMisMatchError === true ? ERROR_PASSWORD_MISMATCH : ERROR_INVALID_CONFIRM_NEW_PASSWORD}
                preview={true}
                autoComplete={`false`}
              />
            </div>
            <div className="col-lg-12">
             <label className="reminderRow" for="password-signin">
                <input id="password-signin" type="checkbox" onChange={e => handleChangeSignIn(e)} defaultChecked={changeSignIn} /> <span className="checkboxLabel"> All devices will be required to sign in with new password</span>
              </label>
            </div>
          </div>  
        </Overlay>
      }
    </React.Fragment>
  );
};

export default Profile;