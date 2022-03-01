import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "recruitment-components/Sidebar/Sidebar.js";
import 'react-toastify/dist/ReactToastify.css';

TopBarProgress.config({
  barColors: {
    "0": "#0c0058",
    "1.0": "#0c0058"
  }
});

const AdminLayout = (allowedPrivileges) => (WrappedComponent) => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        showLoader: true,
        rightSection: false
      }
    }
    componentDidMount() {
      let _this = this
      setTimeout(function(){
        _this.setState({showLoader: false})
      },2000)
    }
    
    render() {
      const handleSidebar = (val) => {
        this.setState({rightSection: val})
      }

      return(
        <React.Fragment>
        {this.state.showLoader && 

          <TopBarProgress />
        }
          <div className={this.state.rightSection ? "main maxRightSection" : "main"}> {/*maxRightSection*/}
            <Sidebar handleSidebar={handleSidebar.bind(this)} />
            <div className={allowedPrivileges && allowedPrivileges.length > 0 && allowedPrivileges[0] == false ? "" : "section"}>
              <WrappedComponent />
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </React.Fragment>
    )}
  }
}

export default AdminLayout;
