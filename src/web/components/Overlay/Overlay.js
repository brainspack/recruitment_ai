import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from "recruitment-components/Button/Button.js";

const Overlay = (props) => {
  const { title, closeOverlay, cancelOverlay, subTitle, submitOverlay, backOverlay } = props;
  return (
    <React.Fragment>
      <div className="popupOverlay">
        <div className="popupWrapper">
          <a className="cross" onClick={() => { closeOverlay() }}><i className="fa fa-times" /></a>
          <h1 className="popupTitle">{title}</h1>
          {subTitle && <p className="popupSubTitle mb-4">{subTitle}</p> }
          {props.children}
          <div className="text-center pt-2 d-block">

            <button className="lineBtn" onClick={() => cancelOverlay()}>{(props.isBackBtn) ? "Back" : "Close"}</button>
            <Button
              type={'blue-button'}
              extraClasses={`${props.disableBtn ? "loaderBtn disable ml-2" : "ml-2"}`}
              onClick={() => props.disableBtn ? "" : submitOverlay()}
              label={(props.isDelete) ? "Delete" : props.btnLabel ? props.btnLabel : "Save"}
              disableBtn={props.disableBtn}
            />
            {/*<button className="blueBtn ml-2" onClick={() => submitOverlay()}>Save</button>*/}
          </div>
          {props.footer && <div className="popupFooter text-center mt-4" onClick={props.onClickFooter}><b><a className="hyperLink">{props.footer}</a></b></div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overlay;
