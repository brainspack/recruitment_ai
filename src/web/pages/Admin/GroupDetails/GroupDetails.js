import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import { useStoreActions, useStoreState } from 'easy-peasy';
import Overlay from "recruitment-components/Overlay/Overlay.js";
import NoRecord from "recruitment-components/NoRecord/NoRecord.js";
import MultiSelectDropDown from "recruitment-components/MultiSelectDropDown/MultiSelectDropDown.js";
import TableTwo from "recruitment-components/TableTwo/TableTwo.js";
const GroupDetails = () => {
    let { id } = useParams();

    const [showAddStudentOverlay, setShowAddStudentOverlay] = useState(false);
    const getStudents = useStoreActions((actions) => actions.admin.getStudents);
    const assignStudent = useStoreActions((actions) => actions.admin.assignStudent);
    const removeTeacherFromGroup = useStoreActions((actions) => actions.admin.removeTeacherFromGroup);
    const removeStudentFromGroup = useStoreActions((actions) => actions.admin.removeStudentFromGroup);
    const getAllTeachersPerGroup = useStoreActions((actions) => actions.admin.getAllTeachersPerGroup);
    const assignTeacher = useStoreActions((actions) => actions.admin.assignTeacher);
    const group = useStoreState((state) => state.admin.group);
    const students = useStoreState((state) => state.admin.students);
    const subjectYearId = useStoreState((state) => state.admin.subjectYearId)
    const allTeachersPerGroup = useStoreState((state) => state.admin.allTeachersPerGroup);
    const getGroup = useStoreActions((actions) => actions.admin.getGroup);
    const getTeachers = useStoreActions((actions) => actions.admin.getTeachers);
    const teachers = useStoreState((state) => state.admin.teachers);
    const setGroup = useStoreActions((actions)=> actions.admin.setGroup)

    const [disableButton, setDisableButton] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showAssignedTeacher, setShowAssignedTeacher] = useState(false);
    const [inviteStudentList, setInviteStudentList] = useState([]);
    const [teachersData, setTeachersData] = useState([]);
    const [selectedTeachers, setSelectedTeachersToAssign] = useState([]);
    //Assign-student
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showAssignTeacherOverlay, setShowAssignTeacherOverlay] = useState(false);
    const [selectGroupStudent, setSelectGroupStudent] = useState([]);
    const [searchStudent, setSearchStudents] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    const [getGroupPayload] = useState({ params: { id: id, page: 1, pagesize: 100,year_id: subjectYearId} })
    //use-Effect
    useEffect(() => {
        let formData = { params: { id: id, page: 1, pagesize: 100,year_id: subjectYearId} }
        getGroup(formData);
        return async()=>{await setGroup(null)}   
    }, [])

    useEffect(() => {
        if (group) {
            let formData = { params: { page: 1, page_size: 100, year_id: group.year_id } }
            getStudents(formData);
            formData = { params: { id: id } }
            getAllTeachersPerGroup(formData);
        }
    }, [group])
    useEffect(() => {
        if (students && group) {
            const inviteStudent = []
            students.data.map((studentList) => {
                let flag = false;
                group.data.map((list, idx) => {
                    if (studentList.id === list.student_id) {
                        flag = true
                    }
                })
                if (!flag) {
                    let newStudent = studentList;
                    newStudent.full_name = studentList.first_name + ' ' + studentList.last_name
                    inviteStudent.push(newStudent);
                }
            })
            setInviteStudentList(inviteStudent)

        }
    }, [students])
    useEffect(() => {
        if (!teachers) {
            let formData = { params: { page: 1, page_size: 200 } }
            //getAllYears();
            getTeachers(formData);
        }
    }, [])

    useEffect(() => {
        if (teachers) {
            if (teachers.data && teachers.data.length) {
                let teacherList = [];
                teachers.data.map((teacher) => {
                    let temp_teacher = teacher;
                    temp_teacher.full_name = teacher.first_name + ' ' + teacher.last_name;
                    teacherList.push(temp_teacher);
                })
                setTeachersData(teacherList);
            } else {
                setTeachersData([]);
            }
        }
    }, [teachers])
    //Functionality Methods
    const addStudentsToGroup = async () => {
        setDisableButton(true)
        const selectedId = [];
        selectedStudents.map((student, index) => {
            selectedId.push({ id: student.id })
        })
        let formData = {
            subject_id: group.subject_id,
            subject_group_id: group.subject_group_id,
            students: selectedId
        }
        await assignStudent(formData);
        formData = { params: { id: id, page: 1, pagesize: 10 } }
        getGroup(formData);
        setDisableButton(false)
        setShowAddStudentOverlay(false);
        getGroup(getGroupPayload)
    }
    const selectAllData = (event) => {
        let selectedId = [];
        if (event.target.checked) {
            group.data.map((item) => {
                selectedId.push(item.id);
            })
        }
        else {
            selectedId = [];
        }

        setSelectGroupStudent(selectedId);
    }
    const onSelectSingleRow = (event, id) => {
        let TempRow = [...selectGroupStudent];
        if (!event.target.checked) {
            TempRow = TempRow.filter(rowId => id != rowId);
        }
        else if (event.target.checked && !selectGroupStudent.includes(id)) {
            TempRow.push(id);
        }

        setSelectGroupStudent(TempRow);
    }
    const deleteGroupStudentCall = async () => {
        const deleteGroupStudentId = []
        selectGroupStudent.map((studentGroupId, idx) => {
            deleteGroupStudentId.push({ id: studentGroupId })
        })
        let formData = { subject_group_students: deleteGroupStudentId }
        setDisableButton(true)
        await removeStudentFromGroup(formData);
        formData = { params: { id: id, page: 1, pagesize: 10 } }
        getGroup(formData);
        setSelectGroupStudent([]);
        setDisableButton(false)
        setShowDelete(false)
        await getGroup(getGroupPayload)
    }
    const onClickRemoveTeacher = async (TeacherId) => {
        let formData = { subject_group_teachers: [{ id: TeacherId }] }
        setDisableButton(true)
        await removeTeacherFromGroup(formData);
        formData = { params: { id: id } }
        await getAllTeachersPerGroup(formData);
        setDisableButton(false)
    }
    const submitAssignTeacher = async (event) => {
        const ids = selectedTeachers.map(teacher => {
            const obj = { id: teacher.id }
            return obj
        })
        let formData = { subject_id: group.subject_id, subject_group_id: group.subject_group_id, teachers: ids }
        setDisableButton(true)
        await assignTeacher(formData);
        formData = { params: { id: id } }
        await getAllTeachersPerGroup(formData);
        setDisableButton(false);
        setShowAssignTeacherOverlay(false);
    }

    return (
        <>
            <div className="section">
                <Link to="/subjects" className="goBack backToClass"><i className="uil uil-arrow-left"></i> Back to Subjects</Link>
                <div className="row">
                    <div className="col-lg-7">
                        <h1 className="pageTitle">
                            <span className="pr-4">{group && `${group.subject_name} - ${group.subject_group_name}`}</span><span className="border-left pl-4">{group && group.data.length}</span> <small>Students</small>
                        </h1>
                    </div>
                    <div className="col-lg-5">
                        <div className="add-student">
                            <button className="topButton float-right" onClick={() => setShowAddStudentOverlay(true)}><i className="fa fa-plus-circle" />Add Student</button>
                        </div>
                        <div className="formField importCSV">
                            <a type="text" className="fieldInput" onClick={() => { setShowAssignedTeacher(true); }}><i className="fa fa-eye"></i>Assigned Teachers</a>
                        </div>
                    </div>

                </div>

                <p className="titleInfo">Here you can organise subjects and assign them to classes or individual students.</p>
                <div className="menuDropdown ml-auto" onClick={() => (selectGroupStudent.length > 0) ? setShowDropDown(!showDropDown) : ""}>
                    <span className={`${(selectGroupStudent.length > 0) ? 'enabled' : ""} ${(showDropDown) ? 'active' : ''}`}><i className="uil uil-ellipsis-h" /></span>
                    
                    {showDropDown && <div className="customDropdown max-h-150 d-block">
                        <a onClick={() => selectGroupStudent.length ? setShowDelete(true) : toast.error(<ToastUI message={'Please select students.'} type={"Error"} />, {
                            toastId: 'toast-show'
                        })}><i className="fa fa-trash-alt mr-2" /> Remove Students</a>
                    </div>}
                </div>
                {/* <div className="mb-4">
                <div className="menuDropdown">
                    <span className="deletegroupIcon active" onClick={() => selectGroupStudent.length ? setShowDelete(true) : toast.error(<ToastUI message={'Please select students.'} type={"Error"} />)}><i className="fa fa-trash-alt"></i></span>
                    <span className="addgroupIcon" onClick={() => setShowAddStudentOverlay(true)}><i className="fa fa-plus"></i></span>
                </div>
            </div> */}
            </div>
            {showAddStudentOverlay &&
                <Overlay
                    title={'Add Student(s)'}
                    subTitle={'Start typing a name to add students to the group'}
                    closeOverlay={() => setShowAddStudentOverlay(false)}
                    cancelOverlay={() => setShowAddStudentOverlay(false)}
                    submitOverlay={() => addStudentsToGroup()}
                    disableBtn={disableButton}
                >
                    <div className="formWrapper">
                        <MultiSelectDropDown
                            options={students ? inviteStudentList : []}
                            onSelect={(selectedData) => { setSelectedStudents(selectedData) }}
                        />
                    </div>
                </Overlay>
            }
            {group && group.data.length ? <div className="table-responsive">
                <table className="table table-borderless fullTable">
                    <thead>
                        <tr>
                            <th className="checkTd"><input type="checkbox" onChange={selectAllData} checked={group && selectGroupStudent.length === group.data.length} /></th>
                            <th className="pl-0"><div className="tableSearch"><img src="/images/search.svg" /><input className="" value={searchStudent} type="text" placeholder="Search Student..." onChange={(event) => { setSearchStudents(event.target.value) }} /></div></th>
                            <th>Email Address</th>
                            <th>Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {group && group.data.map((student, idx) => {
                            return <>
                                {student.student.first_name.includes(searchStudent) && <tr>
                                    <td scope="row"><input type="checkbox" onChange={(event) => { onSelectSingleRow(event, student.id) }} checked={selectGroupStudent.includes(student.id)} /></td>
                                    <td className="tableClientImg">{student.student.image_url != ''?<img id="user-profile-avatar" src={ `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(student.student.image_url)))}` } />:<span style={{ background: 'url("/images/user.jpg")' }} />}{student.student.first_name} {student.student.last_name}</td>
                                    <td>{student.student.email}</td>
                                    <td>{student.student.student_year_forms.form.name}</td>
                                </tr>}
                            </>
                        })}
                    </tbody>
                </table>
            </div> : <NoRecord
                message="No Students"
                subMessage="Add a student to begin"
            />}
            {showDelete &&
                <Overlay
                    title={"Are you sure?"}
                    subTitle={"Are you sure you want to delete this Student?"}
                    closeOverlay={() => setShowDelete(false)}
                    cancelOverlay={() => setShowDelete(false)}
                    submitOverlay={() => deleteGroupStudentCall()}
                    disableBtn={disableButton}
                    isDelete={true}
                >

                </Overlay>
            }
            {showAssignedTeacher &&
                <Overlay
                    title={"Assigned Teachers"}
                    subTitle={`You have ${(allTeachersPerGroup && allTeachersPerGroup.length > 0 ? allTeachersPerGroup.length : 0)} teachers assigned to this subject group.`}
                    closeOverlay={() => setShowAssignedTeacher(false)}
                    cancelOverlay={() => setShowAssignedTeacher(false)}
                    submitOverlay={() => { setShowAssignedTeacher(false) }}
                    disableBtn={disableButton}
                >
                    {allTeachersPerGroup && allTeachersPerGroup.length > 0 && <div className="table-responsive" >
                        <table className="table table-borderless fullTable assignedTeacher" style={{ minWidth: "auto" }}>
                            <thead>
                                <tr>
                                    <th className="pl-0">Assigned Teacher</th>
                                    <th className="">Email Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTeachersPerGroup && allTeachersPerGroup.map((teacher, idx) => {
                                    return <tr>
                                        <td className="tableClientImg"><span style={{ backgroundImage: `url(/images/user.jpg)` }}></span>{teacher.first_name}</td>
                                        <td>{teacher.email}</td>
                                        <td className="pr-3 float-right">
                                            <a onClick={() => { onClickRemoveTeacher(teacher.subject_group_teacher.id) }} className="addField ml-2 text-center"><i className="fa fa-trash-alt"></i></a>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>}
                    <h6 onClick={() => { setShowAssignTeacherOverlay(true); setShowAssignedTeacher(false) }} className="mt-2 mb-5"><a className="importSubjectCSV" style={{ color: "#274D64" }} ><i className="fa fa-plus-circle"></i><label>&nbsp;&nbsp;Assign Teacher</label></a></h6>
                </Overlay>
            }
            {showAssignTeacherOverlay && <Overlay
                title={'Assign Teacher'}
                subTitle={'Start entering the name of the teacher you would like to assign to the group'}
                closeOverlay={() => setShowAssignTeacherOverlay(false)}
                cancelOverlay={() => setShowAssignTeacherOverlay(false)}
                submitOverlay={(event) => submitAssignTeacher(event)}
                disableBtn={disableButton}
            >
                <div className="formWrapper">
                    <MultiSelectDropDown
                        options={teachersData}
                        onSelect={setSelectedTeachersToAssign}
                    />
                </div>
            </Overlay>}
        </>
    )
}

export default GroupDetails