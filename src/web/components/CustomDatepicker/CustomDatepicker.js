import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CustomDatepicker = (props) => { 
  const [startDate, setStartDate] = useState(props.value);

  useEffect(() => { 
    if(props.value) {
      setStartDate(props.value)       
    } else {
      setStartDate(null)
    }
  }, [props.value])

  return (
    <React.Fragment>
      <div className="formFieldOuter">
        <label className="fieldLabel">{props.label}</label>

        <div className="formField">
            <DatePicker 
              dateFormat="dd/MM/yyyy"
              selected={startDate ? startDate : null}
              onChange={date => props.handleDateChange(date)} 
              maxDate={props.maxDate}
              className={"fieldInput"}
              placeholderText={props.placeholder}
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

export default CustomDatepicker;
