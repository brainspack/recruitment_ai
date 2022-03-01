import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
const TimetableFiled = ({ subjects, onClickSubjectName, schedulesData, oncheckGroup, day, id }) => {
  const [subjectMenu, setSubjectMenu] = useState(false);
  const [groupMenu, setGroupMenu] = useState(false);
  return (
    <OutsideClickHandler
      onOutsideClick={() => { setSubjectMenu(false); setGroupMenu(false) }}
    >
      <div className="formField" >
        <div className="timetableField d-flex" style={{ width: "100%", backgroundColor: "transparent", border: "none" }} onClick={() => { setSubjectMenu(!subjectMenu); setGroupMenu(false) }}>
          {!schedulesData.subjects.name &&
            <div className="typeSubject"><span className="subjectInput">Select a subject</span></div>}
          {schedulesData.subjects.name &&
            <React.Fragment>
              <div className="subjectGroup" style={{ borderLeftColor: '#c6ecf6!important' }}>
                <div className="left_border">
                  {schedulesData.subject_groups && schedulesData.subject_groups.map((item) => {
                    return <div style={{ width: '6px', height: `${schedulesData.subject_groups.length > 0 ? 72 / schedulesData.subject_groups.length : 72}px`, backgroundColor: `${item.color}` }}></div>
                  })}
                </div>
                <span>{schedulesData.subjects.name}</span>
                <p className="group-button">
                  {schedulesData.subject_groups && schedulesData.subject_groups.map((item, index) => {
                    return <React.Fragment>{schedulesData.subject_groups.length - 1 === index ? `${item.name}` : `${item.name},`}</React.Fragment>
                  })}
                </p>
                {schedulesData.slot && <p className="group-button"><b>{`${schedulesData.slot.time_start} - ${schedulesData.slot.time_end}`}</b></p>}
              </div>
            </React.Fragment>
          }
          {subjectMenu && !groupMenu && <div className={"customDropdown max-h-150"}>
            {subjects && (subjects.data.length !== 0) ? subjects.data.map((suggestion, index) => {
              return <a onClick={(e) => { e.stopPropagation(); setGroupMenu(true); onClickSubjectName(e, day, schedulesData.slot.time_start, suggestion, schedulesData.slot.time_end) }}>{suggestion.name}</a>
            }) : <a onClick={(e) => { }}>No Subject Found</a>
            }
          </div>}
          {subjectMenu && groupMenu && <div className={"customDropdown max-h-150 text-left"}>

            {subjects && subjects.data.map((suggestion, index) => {
              if (suggestion.id === schedulesData.subjects.id) {
                if (suggestion.subject_groups.length !== 0) {
                  return suggestion.subject_groups.map((group, index) => {
                    return (<a onClick={(e) => { e.stopPropagation() }}>
                      <input key={index} type="checkbox" id={index} checked={schedulesData.subject_groups ? schedulesData.subject_groups.some((obj_check) => {
                        return obj_check.id == group.id;
                      }) : false} onChange={(e) => { e.stopPropagation(); oncheckGroup(e, day, schedulesData.slot.time_start, group, schedulesData.slot.time_end) }} />
                      <label htmlFor={index} style={{display: "inline-block"}}><span>{group.name}</span></label>
                    </a>)
                  })
                }
                else {
                  return (<a onClick={(e) => { }} ><span className="pl-2">No Group Found</span></a>)
                }
              }
            })}
          </div>}
        </div>
      </div>
    </OutsideClickHandler>
  )
}
export default TimetableFiled;