import React, { useState, useEffect } from 'react';

const Textarea = (props) => { 
  
  return (
    <React.Fragment>
      <div className="formFieldOuter">
        <label className="fieldLabel">{props.label}</label>

        <div className="formField">
            <textarea  
              type={props.type} 
              className={props.error ? "fieldInput textarea error" : "fieldInput textarea"} 
              value={props.value} 
              onChange={(e) => props.handleInputChange(e)}
              placeholder={props.placeholder}
            />
            {props.error && 
                <div className="errorMsg">
                  <span>!</span> 
                  <label>{props.errorMessage}</label>
                </div>
            }
        </div>
      </div>
    </React.Fragment>
  );
};

export default Textarea;
