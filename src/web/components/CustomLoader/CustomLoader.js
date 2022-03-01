import React from "react"
//import ContentLoader from "react-content-loader"
import ContentLoader from "recruitment-images/content-loader.svg";
const CustomLoader = (props) => (
  <div className="loader">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <p>Loading...</p>
  </div>
)

export default CustomLoader

