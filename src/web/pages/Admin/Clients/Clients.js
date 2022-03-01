import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from 'recruitment-utils/Validators.js';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Overlay from "recruitment-components/Overlay/Overlay.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import Button from "recruitment-components/Button/Button.js";
import validator from "validator";
import Moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import {NAME_ERROR_MESSAGE, INVALID_FNAME, INVALID_LNAME, ERROR_INVALID_EMAIL, FIRSTNAME_ERROR_MESSAGE, LASTNAME_ERROR_MESSAGE, ERROR_ADDRESS, ERROR_INVALID_DOB, ERROR_INVALID_PHONE } from 'recruitment-message';
import lodash from "lodash";
import { uploadClientCSV } from 'recruitment-api/AdminApi.js';
import ResetIcon from "recruitment-images/refresh-arrows-circle-with-clockwise-rotation.svg";
const Clients = (props) => {
  const history = useHistory();
  let newRef = useRef(null)
  const [noRecord, showNoRecord] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showCsvPopup, setShowCsvPopup] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false);
  const [clientsData, setClientsData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(0);
  const [showCustomLoader, setShowCustomLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [searchClients, setSearchClients] = useState('');
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [yearsData, setYearsData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const clients = useStoreState((state) => state.admin.clients);
  const allYears = useStoreState((state) => state.admin.allYears);
  const subjects = useStoreState((state) => state.admin.subjects);
  const previousClientFilter = useStoreState((state) => state.admin.previousClientFilter)
  const getClients = useStoreActions((actions) => actions.admin.getClients);
  const deleteClient = useStoreActions((actions) => actions.admin.deleteClient);
  const createClient = useStoreActions((actions) => actions.admin.createClient);
  const getAllYears = useStoreActions((actions) => actions.admin.getAllYears);
  const getSubjects = useStoreActions((actions) => actions.admin.getSubjects);
  const setPreviousFilterOfClient = useStoreActions((actions) => actions.admin.setPreviousFilterOfClient);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [nameError,setNameError] = useState()

  //Add client modal
  const [email, setEmailAddress] = useState('');
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [forenameError, setForenameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobError, setDobError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  //Darg and Drop constants

  let dragCounter = useRef(0);
  const [dragFileList, setDragFileList] = useState([]);
  const [fileListError, setFileListError] = useState(false);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const [confirmText, setConfirmText] = useState('');
  const [clientsFullData, setClientsFullData] = useState([]);

  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    getClients();
  }, [])

  useEffect(() => {
    if(clients) {
      setClientsData(clients)
    }
  }, [clients]);


  const columns = [
      {
        name: 'First Name',
        sortable: false,
        cell: (data) => data.first_name,
        width: '20%',
        center: true,
      },
      {
        name: 'Last Name',
        sortable: true,
        cell: (data) => data.last_name,
        width: '20%',
      },
      {
        name: 'Email',
        sortable: false,
        cell: (data) => data.email,
        width: '30%',
      },
      {
        name: '',
        sortable: false,
        cell: (data) => (
          <>
            <Button type="line-button" label="Activate" onClick={() => {}} />
            
          </>
        ),
        width: '30%',
        center: false,
      },
    ];

  const goToUrl = (url) => {
    history.push(url);
  }

  return (
    <React.Fragment>
      {showFullPageLoader &&
        <CustomLoader />
      }
      <div>
        <div className="section pb-0">
          <h1 className="pageTitle"><span className="pr-4">Clients</span>
            <button className="topButton float-right" onClick={() => goToUrl('/add-client')}><i className="fa fa-plus-circle" /> Add Client
          </button></h1>
          <p className="titleInfo">Here you can view, enrol and manage permanent and replacement clients.</p>
        </div>
        <TableOne
          columns={columns}
          data={clientsData}
        />
        
      </div>
      {showDelete &&
        <Overlay
          title={"Are you sure?"}
          subTitle={confirmText}
          closeOverlay={() => setShowDelete(false)}
          cancelOverlay={() => setShowDelete(false)}
          submitOverlay={() => {}}
          disableBtn={disableButton}
        >

        </Overlay>
      }
      
      
    </React.Fragment>
  );
};

export default Clients;
