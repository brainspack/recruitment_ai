import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Sidebar from "recruitment-components/Sidebar/Sidebar.js";
import { isPhoneNumberValid } from 'recruitment-utils/Validators.js';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Input from "recruitment-components/Input/Input.js";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import Button from "recruitment-components/Button/Button.js";
import validator from "validator";
import { Route, useParams } from "react-router-dom";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import { ERROR_INVALID_EMAIL, FIRSTNAME_ERROR_MESSAGE, LASTNAME_ERROR_MESSAGE, ERROR_ADDRESS, ERROR_INVALID_DOB, ERROR_INVALID_PHONE } from 'recruitment-message';
const deleteElements = [];
const SchoolTerms = (props) => { 
  
  const setShowProgressBar = useStoreActions((actions) => actions.classimize.setShowProgressBar);
  useEffect(() => {
    setShowProgressBar(false);
  }, [])


  const [name, setName] = useState(''); 
  const [headStudent, setHeadStudent] = useState(''); 
  const [surname, setSurname] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [dob, setDob] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [address, setAddress] = useState(''); 

  const [teachersData, setTeachersData] = useState([]);
  const [allTerms, setAllTerms] = useState([]);

  const [emailError, setEmailError] = useState(false);
  const [forenameError, setForenameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [deleteButton, setDeleteButton] = useState(false);

  const term = useStoreState((state) => state.admin.term);
  const allTeachers = useStoreState((state) => state.admin.allTeachers);

  const updateTerm = useStoreActions((actions) => actions.admin.updateTerm);
  const getTerm = useStoreActions((actions) => actions.admin.getTerm); 
  const getAllTeachers = useStoreActions((actions) => actions.admin.getAllTeachers);
  const singleTerm = {start_date: new Date(), end_date: new Date(), name: ""}
  const [termId, setTermId] = useState('');
  let { id } = useParams();
  
  // const handlePhoneChange = (a,b,c,d) => {
  //   setPhone(b);
  //   setPhoneError((a) ? false : true)
  // }
  const handlePhoneChange = (event) => {
    var phoneRegExp = /^[0-9]*$/gm
    const value = event.target.value
    setPhone(value);
    // if (value.match(phoneRegExp) || value === "") {
    //   setPhoneError(false)
    //   setPhone(value);
    // }
    // else {
    //   setPhone(value);
    //   setPhoneError(true)
    // }
  }
  useEffect(() => {
    getAllTeachers();
    getTerm();
  }, [])

  useEffect(() => {
    if(term) {
      setName(term.name);
      setAddress(term.address);
      setPhone(term.phone_number);
      setAllTerms(term.terms)
      setHeadStudent(term.head_teacher ? term.head_teacher.id : "")
    }
  }, [term])

  useEffect(() => {
    if(allTeachers) {
      let teachers = []
      allTeachers.map((obj, idx) => {
        teachers.push({id: obj.id, name: obj.first_name+" "+obj.last_name});
      })
      setTeachersData(teachers);
    }
  }, [allTeachers])

  const saveTerm = async() => {

   // alert('h');
    setEmailError(false);
    setForenameError(false);
    setSurnameError(false);
    setAddressError(false);
    setDobError(false);
    setPhoneError(false);

    if(name.trim() == '') {
      setForenameError(true);
      return false;
    }
    if(address.trim() == '') {
      setAddressError(true);
      return false;
    }
    if(isNaN(phone) || !isPhoneNumberValid(phone)){
      setPhoneError(true);
      return false;
    }

    if(name && name.trim() != '') {
      let formData = {
          "name": name,
          "domain": "dav",
          "email": "",
          "phone_number": phone,
          "address": address,
          "deleted_terms" : deleteElements.toString(),
          "head_teacher": {
              "id": headStudent
          },
          "terms": allTerms
      }
      setDisableButton(true)

      let response =   await updateTerm(formData);       
      setDisableButton(false);
      if(response) {
     // history.push('/students');
    }

    }
  }

  const handleDateChange = (date, obj, mode, index) => {
    let dateTerms = JSON.parse(JSON.stringify(allTerms));
    let foundTerm = {};
    let foundTermIndex = 0;
    if(!obj.id) {
      foundTerm = dateTerms[index];
      foundTermIndex = index;
    } else {
      foundTerm = dateTerms.find(e => e.id == obj.id);
      foundTermIndex = dateTerms.findIndex(e => e.id == obj.id);
    }

    if(mode == 'start') {

      foundTerm.start_date = new Date(date);
      foundTerm.end_date = null;
      
      if(foundTerm.end_date != null && foundTerm.start_date > foundTerm.end_date) {
        toast.error(<ToastUI message={"Start Date cannot be greater than End Date"} type={"Error"} />, {
        toastId: 'toast-show'
      });
        return false;
      }
    } else {
      foundTerm.start_date = new Date(foundTerm.start_date);
      foundTerm.end_date = new Date(date);
      if(foundTerm.start_date > foundTerm.end_date) {
        toast.error(<ToastUI message={"End Date cannot be smaller than Start Date"} type={"Error"} />, {
        toastId: 'toast-show'
      });
        return false;
      }
    }

    dateTerms[foundTermIndex] = foundTerm;
    dateTerms.map((obj, idx) => {
      obj.start_date = (obj.start_date) ? new Date(obj.start_date) : null;
      obj.end_date = (obj.end_date) ? new Date(obj.end_date) : null;
    });
    
    setAllTerms(dateTerms);
  }

  const addTerm = () => {
    let dateTerms = JSON.parse(JSON.stringify(allTerms))
    dateTerms.map((obj, idx) => {
      obj.start_date = new Date(obj.start_date)
      obj.end_date = new Date(obj.end_date)
    })
    const TermsCount = (dateTerms.length)+1;
    singleTerm.name = "Terms "+TermsCount;
    dateTerms.push(singleTerm);
    setAllTerms(dateTerms);
  }
  
  const handleDeleteTerm = (id) => {
    setDeleteButton(true);
    setTermId(id);
  }

  const deleteTerm =() => {

    const index = allTerms.splice(allTerms.findIndex(function(key, i){
      if(i === termId)
        deleteElements.push(key.id);

      return i === termId;
    }), 1);
    deleteElements.join("");

    setDeleteButton(false);
  }

  return (
    <React.Fragment>
  <h1 className="pageTitle">School Information  <Button type={'top-button'} extraClasses={`float-right mt-3 ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : saveTerm()} label={"Save Changes"} disableBtn={disableButton} /></h1>
  <div className="row mt-5">
    <div className="col-xl-4 col-lg-5">
      <div className="formTitle">
        <span>School Details</span>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Input
            label={"Name"}
            type={'text'}
            value={name}
            handleInputChange={(e) => setName(e.target.value)}
            error={forenameError}
            placeholder={"Name"}
            errorMessage={FIRSTNAME_ERROR_MESSAGE}
          />
        </div>
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
        <div className="col-xl-12">
          <CustomMobile
            label={"Phone Number(Optional)"}
            value={phone}
            // handlePhoneChange={(a, b, c, d) => handlePhoneChange(a, b, c, d)}
            handlePhoneChange={(event) => handlePhoneChange(event)}
            error={phoneError}
            placeholder={"Phone number"}
            errorMessage={ERROR_INVALID_PHONE}
          />
        </div>
        <div className="col-lg-12">
          <SingleSelect
            label={"Head Teacher"}
            placeholder={'Head Teacher'}
            options={teachersData ? teachersData : []}
            changeOption={(id) => setHeadStudent(id)}
            value={headStudent}
          /> 
        </div>
      </div>
    </div>
    <div className="col-sm-1 dividerOuter">
    </div>
    {
      deleteButton && 
        <Overlay
          title={'Delete Term'}
          subTitle={'Are you sure you want to delete this term?'}
          closeOverlay={() => setDeleteButton(false)}
          cancelOverlay={() => setDeleteButton(false)}
          submitOverlay={() => deleteTerm()}
          disableBtn={disableButton}
          isDelete={true}
        >
        </Overlay>
    }

    <div className="col-xl-5 col-lg-5">
      <div className="formTitle">
        <span>Term Details</span>
      </div>
      <div className="text-right"><a className="addField termDetail" onClick={() => addTerm()}><i className="fa fa-plus-circle" /> Add a term</a></div>
      {allTerms.map((obj, idx) => {
        return (
            <div className="row">
              <label className="fieldLabel col-12">{"Term "+(idx+1)+" (DD/MM/YYYY)"}</label>
              <div className="col-xl-5">
                <CustomDatepicker
                  label={''}
                  value={obj.start_date ? new Date(obj.start_date) : null}
                  handleDateChange={(date) => handleDateChange(date, obj, 'start', idx)}
                  error={dobError}
                  placeholder={"Select from date"}
                  errorMessage={ERROR_INVALID_DOB}
                  maxDate={new Date(new Date().getFullYear(), 11, 31)}
                  minDate={new Date(new Date().getFullYear(), 0, 1)}
                />
              </div>
              <div className="col-xl-5">
              
                <CustomDatepicker
                  label={""}
                  value={obj.end_date ? new Date(obj.end_date) : null}
                  handleDateChange={(date) => handleDateChange(date, obj, 'end', idx)}
                  error={dobError}
                  placeholder={"Select end date"}
                  errorMessage={ERROR_INVALID_DOB}
                  maxDate={new Date(new Date().getFullYear(), 11, 31)}
                  minDate={new Date(new Date().getFullYear(), 0, 1)}
                />
              </div>
              <div className="col-xl-2">
                <div className="delete-terms">
                  <span onClick={() => handleDeleteTerm(idx)}  className="hyperLink"><i className="fa fa-trash-alt"></i></span>
                </div>
              </div>
            </div>
          );
      })}
    </div>
  </div>
    </React.Fragment>
  );
};

export default SchoolTerms;
