import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';


const Timepicker = (props) => { 
  const [startDate, setStartDate] = useState(props.value);
  const format = 'h:mm a';
  return (
    <React.Fragment>
      <TimePicker 
        className={props.className}
        format={format}
        value={moment(props.value, format)} 
        onChange={props.slotChange}
        defaultValue={moment('13:30:56', format)}
      />
    </React.Fragment>
  );
};

export default Timepicker;
