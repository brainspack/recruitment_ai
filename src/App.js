import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'recruitment-routes'
import history from 'recruitment-history'
import "recruitment-theme/css/unicons.css";
import "recruitment-theme/css/tabler-icons.css";
import "./index.scss";

const App = () => {
  

  useEffect(() => {
  }, [])
  return (
    <React.Fragment>
      <Router history={history}>
        <Routes />
      </Router>
    </React.Fragment>
  );
};

export default App;
