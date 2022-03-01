import React, { Component } from 'react';

const ToggleSwitch =(props)=> {
    return (
      <div className="toggle-switch small-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name={props.Name}
          id={props.Name}
          checked={props.checked}
          onChange={e=> props.onChange(e.target.checked)}
        />
        <label className="toggle-switch-label" htmlFor={props.Name}>
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    );
  }


export default ToggleSwitch;