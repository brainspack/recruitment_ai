import React, { useState, useEffect } from 'react';

const Input = (props) => { 
  
  return (
    <React.Fragment>
      <div className="flterByYear mt-5">
        <img src="/images/no-search-result.svg"/>
        <h4>{props.message}</h4>
        <p>{props.subMessage}</p>
      </div>
    </React.Fragment>
  );
};

export default Input;
