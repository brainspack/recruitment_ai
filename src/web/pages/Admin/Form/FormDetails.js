import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy';
import NoRecord from "recruitment-components/NoRecord/NoRecord.js";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
function FormDetails() {
    let { id } = useParams();
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [selectFormStudent, setSelectFormStudent] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [showMoveStudents, setShowMoveStudents] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [formsData, setFormsData] = useState([]);
    const [selectedNewForm,setSelectedNewForm] = useState('');
    const [searchStudents,setSearchStudents] = useState('')
    //Store Action
    const getFormDetails = useStoreActions((actions) => actions.admin.getFormDetails);
    const getStudentByForm = useStoreActions((actions) => actions.admin.getStudentByForm);
    const moveStudentToNewForm = useStoreActions((actions) => actions.admin.moveStudentToNewForm);
    const getAllForms = useStoreActions((actions) => actions.admin.getAllForms);
    const removeStudentFromForm = useStoreActions((actions) => actions.admin.removeStudentFromForm);
    const [moveStudentData,setMoveStudentData] = useState({});
    const getForms = useStoreActions((actions) => actions.admin.getForms);
    //store state
    const formDetails = useStoreState((state) => state.admin.formDetails);
    const formStudentsList = useStoreState((state) => state.admin.formStudentsList);
    const allForms = useStoreState((state) => state.admin.allForms);

    useEffect(async () => {
        setShowLoader(true);
        await getFormDetails(id)
        let formData = { params: { form_id: id } }
        await getStudentByForm(formData);
        setShowLoader(false);
    }, [])
    useEffect(async()=>{
        let formData = { params: { form_id: id,q:searchStudents } }
        await getStudentByForm(formData);
    },[searchStudents])
    useEffect(() => {
        if (formDetails) {
            getAllForms(formDetails.year.id)
        }
    }, [formDetails])
    useEffect(async () => {
        if (formStudentsList) {
            setStudentList(formStudentsList.data)
        }
    }, [formStudentsList])
    useEffect(() => {
        if (allForms) {
            let localForms = []
            
            allForms.map((obj, idx) => {
                localForms.push({ id: obj.id, name: obj.form.name });
            })
            setFormsData(localForms);
        }
    }, [allForms])

    const selectAllData = (event) => {
        let selectedId = [];
        if (event.target.checked) {
            studentList.map((item) => {
                selectedId.push(item.student.id);
            })
        }
        else {
            selectedId = [];
        }
        setSelectFormStudent(selectedId);
    }
    const onSelectSingleRow = (event, id) => {
        let TempRow = [...selectFormStudent];
        if (!event.target.checked) {
            TempRow = TempRow.filter(rowId => id != rowId);
        }
        else if (event.target.checked && !selectFormStudent.includes(id)) {
            TempRow.push(id);
        }
        setSelectFormStudent(TempRow);
    }
    const deleteFormStudentCall = async () => {
        let deleteFormStudentId = selectFormStudent.map((studentFormId, idx) => {
            return { id: studentFormId }
        })
        let formData = { form_id: id, students: deleteFormStudentId }
        setDisableButton(true)
        await removeStudentFromForm(formData);
        formData = { params: { form_id: id } };
        getFormDetails(id);
        getStudentByForm(formData);
        setSelectFormStudent([]);
        setDisableButton(false)
        setShowDelete(false)
        setShowSubmenu(()=>false)
    }
    const moveStudent = async () => {
        let moveFormStudentId = selectFormStudent.map((studentFormId, idx) => {
            return { id: studentFormId }
        })
        let formData = {
            year_id:formDetails.year.id,
            form_id:selectedNewForm,
            students:moveFormStudentId
        }
        setDisableButton(true)
        await moveStudentToNewForm(formData);
        formData = { params: { form_id: id } }
        getFormDetails(id)
        getStudentByForm(formData);
        setSelectFormStudent([]);
        setDisableButton(false)
        setShowMoveStudents(false);
        setShowSubmenu(()=>false);
    }
    return (
        <div>
            { showLoader &&
                <CustomLoader />
            }
            <div className="section pb-0">
                <Link to="/forms" className="goBack backToClass"><i className="uil uil-arrow-left"></i> Back to Forms</Link>
                <h1 className="pageTitle"><span className="pr-4">{formDetails && `${formDetails.name}`}</span><span className="border-left pl-4">{formDetails && formDetails.students_count}</span> <small>Students</small>
                    {/* <button class="topButton float-right"><i class="fa fa-plus-circle"></i> Add Student</button> */}
                </h1>
                <p className="titleInfo">Here you can Manage Student From this class.</p>
                <div className="mb-4">
                    <div className="topFilters">
                        <div className="d-flex">
                            <div className="customField searchBox mr-4">
                                <i className="uil uil-search"></i>
                                <input type="text" className="fieldInput" placeholder="Search student..." onChange={(e)=>{setSearchStudents(e.target.value)}}/>
                            </div>
                            <div className="menuDropdown ml-auto">
                                <span className={`${(selectFormStudent.length > 0) ? 'enabled' : ""} ${(showSubmenu) ? 'active' : ''}`} onClick={() => (selectFormStudent.length > 0 || showSubmenu) ? setShowSubmenu(!showSubmenu) : "" }><i className="uil uil-ellipsis-h"></i></span>
                                {showSubmenu && <div className="customDropdown max-h-150 d-block">
                                    <a onClick={() => { setShowMoveStudents(true) }}><img src="/images/assign.png" /> Move students</a>
                                    <a onClick={() => { setShowDelete(true) }}><i className="fa fa-trash-alt mr-2"></i> Remove students</a>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                studentList && studentList.length ? <div className="table-responsive">
                    <table className="table table-borderless fullTable">
                        <thead>
                            <tr>
                                <th className="checkTd"><input type="checkbox" onChange={selectAllData} checked={studentList && selectFormStudent.length === studentList.length} /></th>
                                <th className="pl-0"><div className="tableSearch">Select All</div></th>
                                <th>Email Address</th>
                                <th>Tutor</th>
                                <th>Guardians</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList && studentList.map((student, idx) => {
                                return <>
                                    <tr key={idx}>
                                        <td scope="row"><input type="checkbox" onChange={(event) => { onSelectSingleRow(event, student.student.id) }} checked={selectFormStudent.includes(student.student.id)} /></td>
                                        <td className="tableClientImg">{student.student.image_url != ''?<img id="user-profile-avatar" src={ `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(student.student.image_url)))}` } />:<span style={{ background: 'url("/images/user.jpg")' }} />} {student.student.first_name}</td>
                                        <td>{student.student.email}</td>
                                        <td>{(student.student.student_tutor.length == 0)?'':student.student.student_tutor[0].first_name}</td>
                                        <td>{student.student.guardians_count}</td>
                                    </tr>
                                </>
                            })}
                        </tbody>
                    </table>
                </div> : <NoRecord
                        message="No Students"
                        subMessage="Add a student to begin"
                    />
            }
            {showMoveStudents &&
                <Overlay
                    title={"Move Students"}
                    subTitle={"Select the class that you would like to move the students to do."}
                    closeOverlay={() => setShowMoveStudents(false)}
                    cancelOverlay={() => setShowMoveStudents(false)}
                    submitOverlay={() => {moveStudent()}}
                    disableBtn={disableButton}
                >
                    <SingleSelect
                        placeholder={'Select Class'}
                        extraClasses={'mb-4'}
                        options={formsData}
                        changeOption={(id) => setSelectedNewForm(id)}
                    />
                </Overlay>}
            {showDelete &&
                <Overlay
                    title={"Are you sure?"}
                    subTitle={"Are you sure you want to delete this Student?"}
                    closeOverlay={() => setShowDelete(false)}
                    cancelOverlay={() => setShowDelete(false)}
                    submitOverlay={() => deleteFormStudentCall()}
                    disableBtn={disableButton}
                    isDelete={true}
                >

                </Overlay>
            }
        </div >
    )
}

export default FormDetails
