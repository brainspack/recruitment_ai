import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TableOneRow from "../TableOneRow/TableOneRow.js";
import { useStoreActions, useStoreState } from 'easy-peasy';
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";

const TableTwo = (props) => {

  const getStudents = useStoreActions((actions) => actions.admin.getStudents);
  const [showLoader, setShowLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [click,setClick] = useState(false);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);

  useEffect(()=>{
    setSelectedRow(props.selectedRow);
  },[props])
  const selectAllData = (event) => {
    let selectedId = [];
    if (event.target.checked) {
      props.rows.map((item) => {
        selectedId.push(item.id);
      })
    }
    else {
      selectedId = [];
    }
    setSelectedRow(selectedId);
    props.onSelect(selectedId);
  }
  const onSelectSingleRow = (event, id) => {
    let TempRow = [...selectedRow];
    if (!event.target.checked) {
      TempRow = TempRow.filter(rowId => id != rowId);
    }
    else if(event.target.checked && !selectedRow.includes(id)){
      TempRow.push(id);
    }
    setSelectedRow(TempRow);
    props.onSelect(TempRow);
  }

  const htmlEntities = (str) => {
    if(str == "&laquo; Previous")
      return "Previous";
    else if(str == "Next &raquo;")
      return "Next";
    else
      return str;
  }

  const getPageData = async(url, label) => {
    if(url !== null){
      setShowFullPageLoader(true)
      const urlParams = new URLSearchParams(url);
      let pageName = '';
      for (const [key, value] of urlParams) {
        pageName = value;
      }
      let formData = { params: { page: pageName, pagesize: 20, q: '', year_id: props.yearId, form_id: props.formId } }
      await getStudents(formData);
      setShowFullPageLoader(false)
    }
  }


  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader/>}
      {props.rows && props.rows.length > 0 &&
        <div className="table-responsive">
          <table className="table table-borderless fullTable">
            <thead>
              <tr>
                <th className="checkTd"><input type="checkbox" onChange={(event) => {event.stopPropagation();selectAllData(event)}} checked={selectedRow.length === props.rows.length} /></th>
                {props.columnsHeader && props.columnsHeader.length > 0 &&
                  props.columnsHeader.map((obj, idx) => {
                    return (
                      <th className={(obj == "Select all") ? "pl-0" : ""}>{obj}</th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {props.rows && props.rows.length > 0 && props.rows.map((obj, idx) => {
                return (

                  <tr className="formRowAction" key={idx} onClick={() => props.editAction ? props.editAction(obj.id) : ""}>
                    {props.columnsToShow && props.columnsToShow.length > 0 && props.columnsToShow.map((objInner, idxInner) => {
                      return (
                        <React.Fragment>
                          {idxInner === 0 ? <React.Fragment>
                            <td scope="row" onClick={(event)=>{event.stopPropagation()}}><input type="checkbox" onChange={(event) => {onSelectSingleRow(event, obj.id) }} checked={selectedRow.includes(obj.id)} /></td>
                            <td className="tableClientImg">
                            {obj['image_url'] && obj['image_url'] != ''?<img id="user-profile-avatar" src={ `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(obj['image_url'])))}` } />:<span style={{ background: 'url("/images/user.jpg")' }} />}
                              
                              {objInner==="first_name"?obj[objInner]+ " " +obj['last_name'] :obj[objInner]}</td>
                          </React.Fragment>:<td>{obj[objInner]}</td>}
                        </React.Fragment>
                      )
                    })
                    }
                    <td className="position-relative">
                      <div className="formRowRightAction">
                        {props.showActions && props.actions.indexOf('edit') > -1 &&
                          <a className="addField" onClick={() => props.editAction(obj.id)}><i className="fa fa-pen fa-w-16"></i></a>
                        }
                        {props.showActions && props.actions.indexOf('delete') > -1 &&
                          <a className="addField ml-2" onClick={() => props.deleteAction(obj.id)}><i className="fa fa-trash fa-w-16"></i></a>
                        }
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {props.fullData && props.rows && props.rows.length < props.fullData.total && 
          <div className="row w-100">
            <div className="col-lg-12 paginationBlock">
              <ul className="pagination text-center justify-content-center">

                {props.fullData && props.fullData.links  && (props.fullData.links).map((obj, idx) => {
                  return <li className={`page-item ${(obj.active == true) ? 'active': ''} ${(obj.url == null) ? 'disable': ''} `}><a disabled={obj.url == null?true:false} className="page-link" href="#" onClick={()=>getPageData(obj.url, obj.label)} >{htmlEntities(obj.label)}</a></li>
                }) }
              </ul>
            </div>
          </div>
          }
          <br/>
        </div>
      }
    </React.Fragment>
  );
};

export default TableTwo;
