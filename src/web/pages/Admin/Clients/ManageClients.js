import React, { useState, useEffect } from "react";
import validator from "validator";
import { validateEmail } from "recruitment-utils/Validators.js";
import { Link, useHistory } from "react-router-dom";
import { apiDateFormat } from "recruitment-utils/Service.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import Logo from "recruitment-images/h1.png";
import LoginBg from "recruitment-images/admin.svg";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import Input from "recruitment-components/Input/Input.js";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import Button from "recruitment-components/Button/Button.js";
import { Route, useParams } from "react-router-dom";
import moment from "moment";
import {
  ERROR_INVALID_EMAIL,
  FIRSTNAME_ERROR_MESSAGE,
  LASTNAME_ERROR_MESSAGE,
  ERROR_ADDRESS,
  ERROR_INVALID_DOB,
  ERROR_INVALID_PHONE,
} from "recruitment-message";

const ManageClients = (props) => {
  const history = useHistory();
  const client = useStoreState((state) => state.admin.client);
  const clientAssignedSubjects = useStoreState(
    (state) => state.admin.clientAssignedSubjects
  );
  const {id} = useParams(); 
  const [showDelete, setShowDelete] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(0);
  const [saveClientId, setsaveClientId] = useState();
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstnameError] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [zipcodeError, setZipcodeerror] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [companyIdError, setCompanyIdError] = useState(false);
  const [companyPhoneError, setCompanyPhoneError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const getClient = useStoreActions((actions) => actions.admin.getClient);
  const deleteClient = useStoreActions((actions) => actions.admin.deleteClient);
  const updateClient = useStoreActions((actions) => actions.admin.updateClient);
  const createClient = useStoreActions((actions) => actions.admin.createClient);

  const [email, setEmailAddress] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(async () => {
    setShowFullPageLoader(true);
    if (saveClientId) {      
      id = atob(saveClientId);
      let formData = { id: id };
      setsaveClientId(id);
      await getClient(formData);
    }
    setShowFullPageLoader(false);
  }, []);

  useEffect(() => {
    if (client) {
      setFirstname(client.first_name);
      setLastname(client.last_name);
      setEmailAddress(client.email);
      setPhoneNumber(client.phone_number);
    }
  }, [client]);

  // const [email, setEmailAddress] = useState(client.email);
  // const [lastname, setLastname] = useState(client.first_name);
  // const [lastname, setLastname] = useState(client.last_name);
  // setLastname('client.first_name');

  const saveClient = async () => {
    setEmailError(false);
    setLastnameError(false);
    setLastnameError(false);
    setPhoneError(false);
    if (firstname.trim() == "") {
      setFirstnameError(true);
      return false;
    }
    if (lastname.trim() == "") {
      setLastnameError(true);
      return false;
    }
    if (email.trim() == "" || !validateEmail(email)) {
      setEmailError(true);
      return false;
    }

    if (phoneNumber != "" && phoneError) {
      setPhoneError(true);
      return false;
    }
    // if(address.trim() == '') {
    //   setAddressError(true);
    //   return false;
    // }

    setDisableButton(true);
    let formData = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone_number: phoneNumber,
      company_name: companyName,
      company_number: companyId,
      company_phone_number: companyPhoneNumber,
      street_address: streetAddress,
      city: city,
      zip_code: zipcode,
      country: country,
    };
    let response = false;
    if (saveClientId) {
      formData.id = saveClientId;
      response = await updateClient(formData);
    } else {
      response = await createClient(formData);
    }

    setDisableButton(false);
    if (response) {
      history.push("/clients");
    }
  };

  const deleteClientCall = async () => {
    let formData = { id: deleteClientId };
    setDisableButton(true);

    await deleteClient(formData);
    setDisableButton(false);
    setShowDelete(false);
  };

  const handlePhoneChange = (event) => {
    var phoneRegExp = /^-?\d+$/;
    const value = event.target.value;
    if (value.match(phoneRegExp) || value === "") {
      setPhoneError(false);
      setPhoneNumber(value);
    } else {
      setPhoneNumber(value);
      setPhoneError(true);
    }
  };

  const handleCompanyPhoneChange = (event) => {
    var phoneRegExp = /^-?\d+$/;
    const value = event.target.value;
    if (value.match(phoneRegExp) || value === "") {
      setCompanyPhoneError(false);
      setCompanyPhoneNumber(value);
    } else {
      setCompanyPhoneNumber(value);
      setCompanyPhoneError(true);
    }
  };

  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}

      <Link to="/clients" className="goBack backToClass">
        <i className="uil uil-arrow-left" /> Back to all clients
      </Link>
      {
        <h1 className="pageTitle mb-4">
          <div className="userImgOuter pt-3">
            {avatar != "" ? (
              <img
                id="user-profile-avatar"
                src={`data:image/svg+xml;base64,${btoa(
                  unescape(encodeURIComponent(avatar))
                )}`}
              />
            ) : (
              <span style={{ background: 'url("/images/user.jpg")' }} />
            )}
            <h2>
              {firstname} {lastname}
            </h2>
          </div>
          <Button
            type={"top-button"}
            extraClasses={`float-right mt-4 ${
              disableButton ? "loaderBtn disable" : ""
            }`}
            onClick={() => (disableButton ? "" : saveClient())}
            label={"Save Changes"}
            disableBtn={disableButton}
          />
        </h1>
      }

      <div className="row">
        <div className="col-sm-5">
          <div className="formTitle">
            <span>Client details</span>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={"Firstname"}
                type={"text"}
                value={firstname}
                handleInputChange={(e) => setFirstname(e.target.value)}
                error={firstNameError}
                placeholder={"Firstname"}
                errorMessage={FIRSTNAME_ERROR_MESSAGE}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={"Lastname"}
                type={"text"}
                value={lastname}
                handleInputChange={(e) => setLastname(e.target.value)}
                error={lastnameError}
                placeholder={"Lastname"}
                errorMessage={LASTNAME_ERROR_MESSAGE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Input
                label={"Email Address"}
                type={"text"}
                value={email}
                handleInputChange={(e) => setEmailAddress(e.target.value)}
                error={emailError}
                placeholder={"Email address"}
                errorMessage={ERROR_INVALID_EMAIL}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={"Company Name"}
                type={"text"}
                value={companyName}
                handleInputChange={(e) => setCompanyName(e.target.value)}
                error={companyNameError}
                placeholder={"Company Name"}
                errorMessage={""}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={"Company ID"}
                type={"text"}
                value={companyId}
                handleInputChange={(e) => setCompanyId(e.target.value)}
                error={companyIdError}
                placeholder={"Company ID"}
                errorMessage={LASTNAME_ERROR_MESSAGE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CustomMobile
                label={"Company Phone Number"}
                value={companyPhoneNumber}
                handlePhoneChange={(event) => handleCompanyPhoneChange(event)}
                error={phoneError}
                placeholder={"Company Phone number"}
                errorMessage={ERROR_INVALID_PHONE}
              />
            </div>
            <div className="col-md-6">
              <CustomMobile
                label={"Phone Number (Optional)"}
                value={phoneNumber}
                handlePhoneChange={(event) => handlePhoneChange(event)}
                error={phoneError}
                placeholder={"Phone number"}
                errorMessage={ERROR_INVALID_PHONE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={"Street Address"}
                type={"text"}
                value={streetAddress}
                handleInputChange={(e) => setStreetAddress(e.target.value)}
                error={companyNameError}
                placeholder={"Street Address"}
                errorMessage={""}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={"City"}
                type={"text"}
                value={city}
                handleInputChange={(e) => setCity(e.target.value)}
                error={cityError}
                placeholder={"City"}
                errorMessage={""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={"Country"}
                type={"text"}
                value={country}
                handleInputChange={(e) => setCountry(e.target.value)}
                error={countryError}
                placeholder={"Country"}
                errorMessage={""}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={"Zip Code"}
                type={"text"}
                value={zipcode}
                handleInputChange={(e) => setZipcode(e.target.value)}
                error={zipcodeError}
                placeholder={"Zip code"}
                errorMessage={""}
              />
            </div>
          </div>
          
        </div>
        <div className="col-sm-1 dividerOuter"></div>
      </div>

      {showDelete && (
        <Overlay
          title={"Are you sure?"}
          subTitle={"Are you sure you want to delete this year?"}
          closeOverlay={() => setShowDelete(false)}
          cancelOverlay={() => setShowDelete(false)}
          submitOverlay={() => deleteClientCall()}
          disableBtn={disableButton}
          isDelete={true}
        ></Overlay>
      )}
    </React.Fragment>
  );
};

export default ManageClients;
