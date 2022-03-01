import React, { useState, useEffect, useRef } from 'react'
import  { Redirect, useHistory } from 'react-router-dom'

const handleAccordian = (event) => {
    const subjectTabId = event.target.getAttribute('subject_id')
    const groupListTabId = subjectTabId.split("_")[2] 
    const groupTab = document.querySelector(`#group_list_tab_${groupListTabId}`)
    if(groupTab){
        if(groupTab.style.display === 'none'){
            if(event.target.getAttribute('accordian_icon') === 'true'){
                event.target.classList.add('uil-angle-up')
                event.target.classList.remove('uil-angle-down')
            }else{
                event.target.parentElement.parentElement.children[2].classList.add('uil-angle-up')
                event.target.parentElement.parentElement.children[2].classList.remove('uil-angle-down')
            }
            
            groupTab.style.display = 'block'
        }else{
            if(event.target.getAttribute('accordian_icon') === 'true'){
                event.target.classList.remove('uil-angle-up')
                event.target.classList.add('uil-angle-down')
            }else{
                event.target.parentElement.parentElement.children[2].classList.remove('uil-angle-up')
                event.target.parentElement.parentElement.children[2].classList.add('uil-angle-down')
            }
            groupTab.style.display = 'none'
        }
    }
}

const handleDropDown = (event) => {
    const buttonId = event.target.getAttribute('dropdown_button_id')
    const contentId = buttonId.split("_")[2] 
    const contentSection = document.querySelector(`#dropdown_content_${contentId}`)
    const subDrop = document.querySelectorAll('.subjectDropdown');
    for(var i = 0; i < subDrop.length; i++){
        if(contentSection.style.display !== subDrop[i].style.display)
        subDrop[i].style.display = 'none';
    }

    if(contentSection){
        if(contentSection.style.display === 'none'){
            contentSection.style.display = 'block';
        }else{
            contentSection.style.display = 'none';
        }
    }   
}

const handleGroupDropDown = (event) => {
    const buttonId = event.target.getAttribute('dropdown_groupbutton_id')
    const contentId = buttonId.split("_")[2] 
    const contentSection = document.querySelector(`#dropdown_group_${contentId}`)
    const subDrop = document.querySelectorAll('.groupDropdown');
    for(var i = 0; i < subDrop.length; i++){
        if(contentSection.style.display !== subDrop[i].style.display)
        subDrop[i].style.display = 'none';
    }

    if(contentSection){
        if(contentSection.style.display === 'none'){
            contentSection.style.display = 'block';
        }else{
            contentSection.style.display = 'none';
        }
    }   
}

const deleteSubject = (props, id) => {
    props.deleteSub(id)
    const contentSection = document.querySelector(`#dropdown_content_${id}`)
    if(contentSection){
        contentSection.style.display = 'none'
    }
}

const editSubject = (props, id, name, image) => {

    props.editSub(id, name, image)
    const contentSection = document.querySelector(`#dropdown_content_${id}`)
    if(contentSection){
        contentSection.style.display = 'none'
    }
}

const deleteGroup = (props, id) => {
    props.deleteGroup(id)
    const contentSection = document.querySelector(`#dropdown_group_${id}`)
    if(contentSection){
        contentSection.style.display = 'none'
    }
}

const editGroup = (props, subject, id, name, image) => {
     props.editGroup(subject, id, name, image)
    const contentSection = document.querySelector(`#dropdown_group_${id}`)
    if(contentSection){
        contentSection.style.display = 'none'
    }
}

const Accordian = (props) => {
    const history = useHistory();

    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();
    

    const handleClickOutside = e => {
        if(e.target.text !== 'Delete Subject' && e.target.text !== 'Edit Subject' && (e.target).getAttribute('name') !== 'subjectOptions'){

            const subDrop = document.querySelectorAll('.subjectDropdown');
            for(var i = 0; i < subDrop.length; i++){
                subDrop[i].style.display = 'none';
            }
        }
    };

    const handleClickInside = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return(
        <React.Fragment >
        {
            props.subjectsData.map(data => {
                let subImg = `/images/book.svg`;
                if(data.image_url){
                    subImg = data.image_url;
                }
                return(
                    <div className="formRow subjectRow" key={data.id} ref={myRef} onClick={() => handleClickInside() }>
                        <div className="subjectTop">
                            <div>
                                <div className="subjectImg" style={{backgroundImage: `url(${subImg})`}}></div>
                                <span style={{cursor: 'pointer'}} className="subjectname" subject_id={`subject_tab_${data.id}`} onClick={handleAccordian}>{data.name}</span>
                                <span className="subjectstudent">{data.students_count?data.students_count:0} Students</span>
                            </div>
                            {/* <a className="importSubjectCSV"><img src="images/import.png"/> <label>Import CSV File</label></a> */}
                            <i style={{cursor: 'pointer', position: 'absolute', right: '80px'}} dropdown_button_id={`dropdown_button_${data.id}`} name="subjectOptions" className="uil uil-ellipsis-h" onClick={handleDropDown}></i>
                            <div className="menuDropdown ml-auto subjectDropdown" style={{flex: '0 0', display: 'none'}} id={`dropdown_content_${data.id}`}>
                                <div className="customDropdown max-h-150 d-block">
                                    <a style={{color: '#0c0058'}} href="#" onClick={() => deleteSubject(props, data.id)}><i className="fa fa-trash-alt mr-2" />Delete Subject</a>
                                    <a style={{color: '#0c0058'}} href="#" onClick={() => editSubject(props,data.id, data.name, data.image)}><i className="fa fa-pen-alt mr-2" />Edit Subject</a>
                                    {/* <a className="importSubjectCSV"><img src="images/import.png"/><label>Import CSV File</label></a> */}
                                </div>
                            </div>
                            
                            <i style={{cursor: 'pointer', position: 'absolute', right: '40px'}} accordian_icon="true" subject_id={`subject_tab_${data.id}`} onClick={handleAccordian} className={data.id === props.newSubjectId ? "uil uil-angle-up" :"uil uil-angle-down"}></i>
                        </div>
                        <div id={`group_list_tab_${data.id}`} style={{display: props.newSubjectId === data.id ? 'block' :'none'}}>
                            {
                                data.subject_groups.map(group => {
                                    return(
                                        <div className="subjectGroupOuter" key={group.id}>
                                            <div className="subjectGroup">
                                                <div>
                                                    <labe className="subjectColor" style={{background: group.color}}></labe>
                                                    <span className="subjectname" style={{cursor: 'pointer'}} onClick={() => history.push('/group-details/' + group.id)}>{group.name}</span>
                                                    <span className="subjectstudent" style={{cursor: 'pointer'}} onClick={() => history.push('/group-details/' + group.id)}>{group.students_count} Students</span>  
                                                    <span className="subjectstudent" style={{cursor: 'pointer'}} onClick={() => history.push('/group-details/' + group.id)}>{group.teacher_count} Teachers Assigned</span>
                                                    
                                                </div>
                                                <a subject_id={data.id} subject_group_id={group.id} className="importSubjectCSV" onClick={props.assignTeacher}><i subject_id={data.id} subject_group_id={group.id} className="fa fa-plus-circle"></i> <label subject_id={data.id} subject_group_id={group.id}>Assign Teacher</label></a>
                                                <a style={{position: 'relative', left: '20px'}} subject_id={data.id} subject_group_id={group.id} className="importSubjectCSV" onClick={() => props.assignStudents({subject_name: data.name, ...group})}><i subject_id={data.id} subject_group_id={group.id} className="fa fa-plus-circle"></i> <label subject_id={data.id} subject_group_id={group.id}>Add Student</label></a>
                                                
                                                <i className="uil uil-ellipsis-h" onClick={handleGroupDropDown} dropdown_groupbutton_id={`dropdown_groupbutton_${group.id}`}></i>
                                                <div className="menuDropdown ml-auto groupDropdown" style={{flex: '0 0', display: 'none'}} id={`dropdown_group_${group.id}`}>
                                                    <div className="customDropdown max-h-150 d-block" style={{top: "40px", right: "40px"}}>
                                                        <a style={{color: '#0c0058'}} onClick={() => deleteGroup(props, group.id)}><i className="fa fa-trash-alt mr-2" />Delete Group</a>
                                                        <a style={{color: '#0c0058'}} onClick={() => editGroup(props, data.id, group.id, group.name, group.color)}><i className="fa fa-pen-alt mr-2" />Edit Group</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="subjectCreateGroup">
                                <a subjectId={data.id} className="hyperLink" onClick={props.createGroup}><i className="fa fa-plus-circle"></i> Create Group</a>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </React.Fragment>
    )
}

export default Accordian