import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy';
import Input from "recruitment-components/Input/Input.js";
import NoRecord from "recruitment-components/NoRecord/NoRecord.js";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import Logo from "recruitment-images/h1.png";
import LoginBg from "recruitment-images/admin.svg";
import { toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";

const Forms = (props) => {

  const [showLoader, setShowLoader] = useState(false);
  const [noRecord, showNoRecord] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCustomLoader, setShowCustomLoader] = useState(false);
  const [formsName, setFormsName] = useState('');
  const [formsData, setFormsData] = useState([]);
  const [yearsData, setYearsData] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [editFormId, setEditFormId] = useState(0);
  const [deleteFormId, setDeleteFormId] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [mode, setMode] = useState('add');
  const [nameError, setNameError] = useState(false);
  const [formError,setFormError] = useState()

  const forms = useStoreState((state) => state.admin.forms);
  const allYears = useStoreState((state) => state.admin.allYears);
  const previousSelectedYear = useStoreState((state)=>state.admin.previousSelectedYear)
  const getAllYears = useStoreActions((actions) => actions.admin.getAllYears);
  const setPreviousSelectedYear = useStoreActions((actions) => actions.admin.setPreviousSelectedYear);
  const getForms = useStoreActions((actions) => actions.admin.getForms);
  const createForm = useStoreActions((actions) => actions.admin.createForm);
  const updateForm = useStoreActions((actions) => actions.admin.updateForm);
  const deleteForm = useStoreActions((actions) => actions.admin.deleteForm);
  useEffect(() => {
    if(previousSelectedYear){
      changeOption(previousSelectedYear);
    }
    //let formData = {params: {page: 1, page_size: 200}}
    getAllYears();
    setFormsData([])
    //getForms(formData);
  }, [])

  useEffect(() => {
    if (forms) {
      if (forms.data.length) {
        setFormsData(forms.data);
        showNoRecord(false);
      } else {
        showNoRecord(true);
      }
      setShowCustomLoader(false);
    } else {
      showNoRecord(true);
    }
  }, [forms])

  useEffect(() => {
    if (allYears && allYears && allYears.length) {
      setYearsData(allYears);
      setShowCustomLoader(false);
    }
  }, [allYears])

  const submitForm = async () => {

    if(formsName.trim() == ''){
      setNameError(true);
      setFormError('Form name is required')
      return false;
    }
    /*
    if(!formsName.substring(0,4).match(/[A-Z,a-z]{4,}/g)){
      setNameError(true);
      setFormError('Enter minimum 4 characters')
      return false
    }
    */    

    if (formsName && formsName.trim() != '') {
      let formData = { name: formsName, year_id: selectedYear }
      setDisableButton(true)
      if (mode == 'edit') {
        formData.id = editFormId
        await updateForm(formData);
      } else {
        await createForm(formData);
      }
      setDisableButton(false);
      setFormsName('');
      setShowOverlay(false);
    }
  }
  const editHandler = (id) => {
    let form = formsData.find(e => e.id == id);
    setEditFormId(id)
    setMode('edit');
    setShowOverlay(true);
    setFormsName(form.name);
  }

  const deleteHandler = (id) => {
    setDeleteFormId(id);
    setShowDelete(true);
  }

  const deleteFormCall = async () => {
    let formData = { id: deleteFormId, year_id: selectedYear }
    setDisableButton(true)

    await deleteForm(formData);
    setDisableButton(false)
    setShowDelete(false)

  }
  const openForm = () => {
    if(selectedYear === 0) {
      toast.error(<ToastUI message={"Please select year first"} type={"Error"} />, {
        toastId: 'toast-show'
      });
      return false
    }
    setMode('add');
    setEditFormId(0)
    setFormsName('');
    setShowOverlay(true);
  }

  const changeOption = (id) => {
    if (id != selectedYear) {
      setSelectedYear(id);
      setPreviousSelectedYear(id);
      setFormsData([])
      setShowCustomLoader(true);
      showNoRecord(false);
      let formData = { params: { page: 1, page_size: 200, year_id: id } }
      getForms(formData);
    }
  }

  const closePopup = () => {
    setShowOverlay(false);
    setNameError(false);
  }

  return (
    <React.Fragment>
      <div>
        <h1 className="pageTitle"><span className="pr-4">Forms</span>
          <button className="topButton float-right" onClick={() => { openForm() }}><i className="fa fa-plus-circle" /> Create Form
            </button></h1>
        <p className="titleInfo">Here you can import a CSV file to categorise your students into years.</p>
        <div className="topFilters mb-5">
          <SingleSelect
            placeholder={'Years'}
            extraClasses={'selectYear smallInput120'}
            options={yearsData}
            value={selectedYear}
            changeOption={(id) => changeOption(id)}
          />
          <div className="formField importCSV">
            {/*<a type="text" className="fieldInput"><img src="images/import.png" /> Import CSV File</a>*/}
          </div>
        </div>
        
        {showCustomLoader &&
          <CustomLoader />
        }
        {!noRecord ?
        <>
          <TableOne
            rows={formsData}
            columns={['name', 'students_count']}
            actions={['edit', 'delete']}
            editAction={(id) => editHandler(id)}
            deleteAction={(id) => deleteHandler(id)}
            showActions={true}
            redirectTo="/form-details"
          />
        </>
        :
        <>
          <NoRecord message="No Forms"  subMessage="Create a form to begin" />
        </>  
        }
      </div>
      {showOverlay &&
        <Overlay
          title={(mode == 'add') ? 'Create Form' : "Edit Form"}
          subTitle={(mode == 'add') ? 'Name the forms that you would like to add.' : "Name of form"}
          closeOverlay={() => closePopup()}
          cancelOverlay={() => closePopup()}
          submitOverlay={() => submitForm()}
          disableBtn={disableButton}
        >
          <div className="formWrapper">
            <Input
              label={""}
              type={'text'}
              value={formsName}
              handleInputChange={(e) => {setFormsName(e.target.value)}}
              handleInputKeyPress={(event)=>event.key === 'Enter'?submitForm():''}
              error={nameError}
              placeholder={"e.g. Forms 8"}
              errorMessage={formError}
            />
          </div>
        </Overlay>
      }
      {showDelete &&
        <Overlay
          title={"Are you sure?"}
          subTitle={"Are you sure you want to delete this form?"}
          closeOverlay={() => setShowDelete(false)}
          cancelOverlay={() => setShowDelete(false)}
          submitOverlay={() => deleteFormCall()}
          disableBtn={disableButton}
          isDelete={true}
        >

        </Overlay>
      }
    </React.Fragment>
  );
};

export default Forms;
