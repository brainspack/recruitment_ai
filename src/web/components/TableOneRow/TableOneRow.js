import React, { useState, useEffect } from 'react';
import { Link ,useHistory} from "react-router-dom";

const TableOneRow = (props) => {
  
  const [showLoader, setShowLoader] = useState(false); 
  const [showOverlay, setShowOverlay] = useState(false); 
  const history = useHistory();
  
  return (
    <React.Fragment>
      <a className="formRow formRowAction tableOneRow" >
        <div className="subjectTop" style={{width: '98%'}} onClick={()=>{props.redirectTo && history.push(`${props.redirectTo}/${props.rowData.id}`)}}>
        {props.rowData && Object.keys(props.rowData).length > 0 && Object.keys(props.rowData).map((obj, idx) => {
            if(props.columns.indexOf(obj) > -1){
              return (<span>{props.rowData[obj]} {(obj == 'students_count') ? 'Students' : "" }</span>)
            } else {
              return false;
            }

          })
        }
        </div>
        <div className="formRowRightAction">
          {props.showActions && props.actions && props.actions.indexOf('import') > -1 && 
          <a className="importSubjectCSV"><img src="images/import.png" /> <label>Import CSV File</label></a>
          }
          {props.showActions && props.actions && props.actions.indexOf('edit') > -1 && 
          <a className="addField" onClick={() => props.editAction(props.rowData.id)}><i className="fa fa-pen fa-w-16"></i></a>
          }
          {props.showActions && props.actions && props.actions.indexOf('delete') > -1 && 
          <a className="addField ml-2" onClick={() => props.deleteAction(props.rowData.id)}><i className="fa fa-trash fa-w-16"></i></a>
          }
          {props.showAccordian && 
          <i className="uil uil-angle-down" style={{fontsize: '30px'}} />
          }
        </div>
      </a>
    </React.Fragment>
  );
};

export default TableOneRow;
