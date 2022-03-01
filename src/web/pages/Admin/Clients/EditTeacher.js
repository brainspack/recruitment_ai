import React, { useState, useEffect } from 'react';
import validator from "validator";
import { Link, useHistory } from "react-router-dom";
import {apiDateFormat} from 'recruitment-utils/Service.js';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Overlay from "recruitment-components/Overlay/Overlay.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import Logo from "recruitment-images/h1.png";
import LoginBg from "recruitment-images/admin.svg";
import Input from "recruitment-components/Input/Input.js";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import Button from "recruitment-components/Button/Button.js";
import { Route, useParams } from "react-router-dom";
import { ERROR_INVALID_EMAIL, FIRSTNAME_ERROR_MESSAGE, LASTNAME_ERROR_MESSAGE, ERROR_ADDRESS, ERROR_INVALID_DOB, ERROR_INVALID_PHONE } from 'recruitment-message';

const EditTeacher = (props) => {
  const  history = useHistory(); 
  const teacher = useStoreState((state) => state.admin.teacher);
  const [showDelete, setShowDelete] = useState(false); 
  const [deleteTeacherId, setDeleteTeacherId] = useState(0); 
  const [editTeacherId, setEditTeacherId] = useState(0); 
  const [showLoader, setShowLoader] = useState(false); 
  const [showOverlay, setShowOverlay] = useState(false); 
  const [emailError, setEmailError] = useState(false);
  const [forenameError, setForenameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobError, setDobError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const deleteTeacher = useStoreActions((actions) => actions.admin.deleteTeacher);
  const getTeacher = useStoreActions((actions) => actions.admin.getTeacher);

  const [email, setEmailAddress] = useState('');
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [nameError,setNameError] = useState()
  let { id } = useParams();

  useEffect(() => {
    if(!teacher) {
      let formData = {id:id}
      setEditTeacherId(id)
      getTeacher(formData);
    }    
  }, [])

  useEffect(() => {
    if(teacher) {
      setForename(teacher.first_name);
      setSurname(teacher.last_name);
      setEmailAddress(teacher.email);
      setAddress(teacher.address);
      setPhoneNumber(teacher.phone_number);
      setDob(new Date(teacher.dob));
    }
  }, [teacher])

  // const [email, setEmailAddress] = useState(teacher.email);
  // const [forename, setForename] = useState(teacher.first_name);
  // const [surname, setSurname] = useState(teacher.last_name);



   // setForename('teacher.first_name');


   const updateTeacher = useStoreActions((actions) => actions.admin.updateTeacher);

  const editTeacher = async() => {
    setEmailError(false);
    setForenameError(false);
    setSurnameError(false);
    setAddressError(false);

    if(forename.trim() == '') {
      setForenameError(true);
      setNameError(FIRSTNAME_ERROR_MESSAGE)
      return false;
    }
    if(forename.trim().replace(/\s/g,'').length<3){
      setForenameError(true)
      setNameError("Minimum 3 character required")
      return false
    }
    if(!forename.match(/^[a-z ,.'-]{3,}$/i)){
      setForenameError(true);
      setNameError(NAME_ERROR_MESSAGE)
      return false;
    }
    if(surname.trim() == '') {
      setSurnameError(true);
      setNameError(LASTNAME_ERROR_MESSAGE)
      return false;
    }
    if(surname.trim().replace(/\s/g,'').length<3){
      setSurnameError(true)
      setNameError("Minimum 3 character required")
      return false
    }
    // if(!surname.match(/^[a-z ,.'-]+$/i))
    if(!surname.match(/^[a-z ,.'-]{3,}$/i)){
      setSurnameError(true);
      setNameError(NAME_ERROR_MESSAGE)
      return false;
    }
    if(email.trim() == '' || !validator.isEmail(email)) {
      setEmailError(true);
      return false;
    }
    if(phoneError) {
      return false; 
    }
    // if(address.trim() == '') {
    //   setAddressError(true);
    //   return false;
    // }

    setDisableButton(true);
    let formData = {
        "first_name": forename,
        "last_name": surname,
        "email": email,
        "dob": apiDateFormat(dob),
        "phone_number": phoneNumber,
        "address": "",
        "city": "",
        "state": "",
        "zip": "",
        "image": "",
        "id" : editTeacherId
    };

    let response = await updateTeacher(formData);
    setDisableButton(false);
    if(response) {
      history.push('/teachers');
    }

  }

  const deleteTeacherCall = async() => {
    let formData = {id: deleteTeacherId}
    setDisableButton(true)

    await deleteTeacher(formData);
    setDisableButton(false)    
    setShowDelete(false)    

  }

  const handlePhoneChange = (a,b,c,d) => {
    
    setPhoneNumber(b);
    setPhoneError((a) ? false : true)

  }
  return (    
    <React.Fragment>
      <div className="section">
        <Link to="/teachers" className="goBack backToClass"><i className="uil uil-arrow-left" /> Back to all teachers</Link>
        
        <h1 className="pageTitle mb-4">
          <div className="userImgOuter">
            <span style="background:url('images/user.jpg');"></span>
            <h2>Mrs jackson</h2>
          </div>
          <Button type={'top-button'} extraClasses={`float-right mt-3 ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : editTeacher()} label={"Save Changes"} disableBtn={disableButton} />
        </h1>

        <div className="row">
          <div className="col-sm-5">
            <div className="formTitle">
              <span>Teacher details</span>
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
                  errorMessage={nameError}
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
                  errorMessage={nameError}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Input
                  label={"Email Address"}
                  type={'text'}
                  value={email}
                  handleInputChange={(e) => setEmailAddress(e.target.value)}
                  error={emailError}
                  placeholder={"Email address"}
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
                  error={dobError}
                  placeholder={"Date of Birth"}
                  errorMessage={ERROR_INVALID_DOB}
                  maxDate={new Date()}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <CustomMobile
                  label={"Phone Number"}
                  value={phoneNumber}
                  handlePhoneChange={(a,b,c, d) => handlePhoneChange(a,b,c,d)}
                  error={phoneError}
                  placeholder={"Phone number"}
                  errorMessage={ERROR_INVALID_PHONE}
                  maxDate={new Date()}
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
          <div className="col-sm-1 dividerOuter">
          </div>
          <div className="col-sm-6">
            <div className="formTitle">
              <span>Subjects</span>
              {/* <a className="addField"><i className="fa fa-plus-circle" /> Add Subject</a> */}
            </div>
            <div className="Guardians profileSubject">
              <span>Biology</span>
              <div>
                <div className="yearGroup">
                  <label>Year 10</label>
                  <label>Group 8</label>
                </div>
              </div>
            </div>
            <div className="Guardians profileSubject">
              <span>Chemistry</span>
              <div>
                <div className="yearGroup">
                  <label>Year 10</label>
                  <label>Group 8</label>
                </div>
                <div className="yearGroup">
                  <label>Year 8</label>
                  <label>Group 1</label>
                </div>
              </div>
            </div>
            <div className="Guardians profileSubject">
              <span>Physics</span>
              <div>
                <div className="yearGroup">
                  <label>Year 10</label>
                  <label>Group 8</label>
                </div>
                <div className="yearGroup">
                  <label>Year 8</label>
                  <label>Group 1</label>
                </div>
                <div className="yearGroup">
                  <label>Year 8</label>
                  <label>Group 1</label>
                </div>
              </div>
            </div>
            <div className="Guardians profileSubject">
              <span>Religion and Philosophy</span>
              <div>
                <div className="yearGroup">
                  <label>Year 10</label>
                  <label>Group 8</label>
                </div>
                <div className="yearGroup">
                  <label>Year 8</label>
                  <label>Group 1</label>
                </div>
                <div className="yearGroup">
                  <label>Year 8</label>
                  <label>Group 1</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
         {showDelete && 
          <Overlay
            title={"Are you sure?"}
            subTitle={"Are you sure you want to delete this year?"}
            closeOverlay={() => setShowDelete(false)}
            cancelOverlay={() => setShowDelete(false)}
            submitOverlay={() => deleteTeacherCall()}
            disableBtn={disableButton}
            isDelete={true}
          >
            
          </Overlay>
        }
    </React.Fragment>
    );
};

export default EditTeacher;
