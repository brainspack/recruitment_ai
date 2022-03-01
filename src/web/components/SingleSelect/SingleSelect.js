import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const SingleSelect = (props) => {
  
  const [showOptions, setShowOptions] = useState(false); 
  const [showOverlay, setShowOverlay] = useState(false);

  const [label, setLabel] = useState(props.placeholder);
  useEffect(() => {
    if(props.value) {
      let selectedValue = props.options.find(e => e.id.toString().toUpperCase() === props.value.toString().toUpperCase());
      if(selectedValue){
        setLabel(selectedValue.name);
      }
    }
    else{
      setLabel(props.placeholder);
    }
  }, [props.value,props.options])

  const changeOption = (obj) => {
    setShowOptions(false);
    setLabel(obj.name);
    props.changeOption(obj.id);
  } 

  return (
    <React.Fragment>
      {(props.label) && <label className="fieldLabel">{props.label}</label> }
      <div className={`formField ${props.extraClasses}`}>
        <button  className="fieldInput d-flex" style={{alignItems:"center"}} onClick={() => setShowOptions(!showOptions)} onBlur={()=>{setShowOptions(false)}}><span>{label}</span><i className={showOptions ? "uil uil-angle-up arrow" : "uil uil-angle-down arrow"} />
        {showOptions && props.options.length > 0 && 
          <div className={`customDropdown max-h-150 text-left ${props.DropUpClass}`} style={{fontFamily: 'neue_helveticaroman'}}>
            {props.options && props.options.map((obj, idx) => {
                return (<label key={idx} onClick={() => changeOption(obj)}> {obj.name}</label>)
            })}
          </div>
        }
        {showOptions && props.options.length == 0 &&
          <div className="customDropdown max-h-150"> 
            <label> No {props.placeholder}</label>
          </div>
        }
        </button>
        {/* <div  className="fieldInput" onClick={() => setShowOptions(!showOptions)}>{label}<i className={showOptions ? "uil uil-angle-up arrow" : "uil uil-angle-down arrow"} /></div> */}
        {props.error && 
                <div className="errorMsg">
                  <span>!</span> 
                  <label>{props.errorMessage}</label>
                </div>
        }
        
        {/* {showOptions && props.options.length > 0 && 
          <div className="customDropdown max-h-150">
            {props.options && props.options.map((obj, idx) => {
                return (<label key={idx} onClick={() => changeOption(obj)}> {obj.name}</label>)
            })}
          </div>
        }
        {showOptions && props.options.length == 0 &&
          <div className="customDropdown max-h-150"> 
            <label> No data</label>
          </div>
        } */}
      </div>
    </React.Fragment>
  );
};

export default SingleSelect;
