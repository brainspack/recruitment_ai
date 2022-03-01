import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from "react-router-dom";
import Sidebar from "recruitment-components/Sidebar/Sidebar.js";
import { Pie, Line } from 'react-chartjs-2';
import Tabs, { TabPane } from 'rc-tabs';
import 'rc-tabs/assets/index.css';
import moment from 'moment';
import NoDocImg from "recruitment-images/no-documents.svg";
import UserImg from "recruitment-images/user.jpg";
import NoConnections from "recruitment-images/no-connection.svg";
import { clearUserData} from "../../../lib/utils/Service"
import {useHistory} from "react-router-dom"
import { set } from 'js-cookie';
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";

const pieOptions = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  tooltips: {
    enabled: false
  },
  legend: {
    display: true,
    position: 'right',
    rtl: false,
    labels: {
      usePointStyle: true
    }
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  }
};

const lineOptions = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          callback: function(value) {
            return `${value}%`;
          },
          max: 100,
          min: 0,
          stepSize: 10
        }
      }
    ]
  }
};

const Dashboard = (props) => {
  const history = useHistory()
  const [customLoader,setCustomLoader] = useState(false)
  const [forename, setForename] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [avtarGenderMale, setAvtarGenderMale] = useState(true);
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const getUserProfile = useStoreActions((actions) => actions.admin.getUserProfile);
  const setShowProgressBar = useStoreActions((actions) => actions.classimize.setShowProgressBar);
  const getStudentsStatus = useStoreActions((actions) => actions.admin.getStudentsStatus);
  const studentStatus = useStoreState((state) => state.admin.studentStatus);
  const getTeacherStatus = useStoreActions((actions) => actions.admin.getTeacherStatus);
  const teacherStatus = useStoreState((state) => state.admin.teacherStatus);
  const [studentChartData, setStudentChartData] = useState({});
  const [teacherChartData, setTeacherChartData] = useState({});
  const [lineChartData, setLineChartData] = useState([]);
  const [showLineChart, setShowLineChart] = useState(false);
  // const getTeacherTopPerformance = useStoreActions((actions) => actions.admin.getTeacherTopPerformance);
  const teacherTopPerformance = useStoreState((state) => state.admin.teacherTopPerformance);
  const getStudentTopPerformance = useStoreActions((actions) => actions.admin.getStudentTopPerformance);
  const studentTopPerformance = useStoreState((state) => state.admin.studentTopPerformance);
  const [topStudentData, setTopStudentData] = useState([]);
  const [topTeachertData, setTopTeachertData] = useState([]);
  const [weeklyPerformance, setWeeklyPerformance] = useState({})


  
  setInterval(function(){ 
    const time = localStorage.getItem('session')
      if(Number(time) <= Date.now()){
        clearUserData()
        history.push("/login")
      }
    }, 5000);

  useEffect(async() => {
   
  }, []);
  useEffect(() => {
    if (studentStatus) {
      setStudentChartData({
        maintainAspectRatio: false,
        responsive: true,
        labels: [`${studentStatus.inactive_students} Inactive`,`${studentStatus.active_students} Online`, ],
        datasets: [
          {
            data: [studentStatus.inactive_students,studentStatus.active_students],
            backgroundColor: ["#0c0058","#61c788"],
            borderColor: "#fff",
            borderWidth: 5,
            weight: 291
          }
        ]
      })
    }
  }, [studentStatus]);
  useEffect(() => {
    if (teacherStatus) {
      setTeacherChartData({
        maintainAspectRatio: false,
        responsive: false,
        labels: [`${teacherStatus.inactive_teachers} Inactive`, `${teacherStatus.active_teachers} Online`],
        datasets: [
          {
            data: [teacherStatus.inactive_teachers, teacherStatus.active_teachers],
            backgroundColor: ["#0c0058", "#2dadb5"],
            borderColor: "#fff",
            borderWidth: 5,
            weight: 291
          }
        ]
      })
    }
  }, [teacherStatus]);

  // TEACHER PERFORMANCE
  useEffect(() => {
    if(teacherTopPerformance) {
      setTopTeachertData(teacherTopPerformance);
    }
  }, [teacherTopPerformance])

  // STUDENT PERFORMANCE
  useEffect(async() => {
    if(studentTopPerformance) {
     await setTopStudentData(studentTopPerformance.top_performing_students);
     await setWeeklyPerformance(studentTopPerformance.weekly_school_performance);
    }
  }, [studentTopPerformance])

  useEffect(()=>{getLineChartData();},[weeklyPerformance])

  useEffect(() => {
    //getUserProfile();
  }, [avtarGenderMale])
  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = today.toLocaleString('default', { month: 'long' }); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + ' ' + mm + ' ' + yyyy;
    setTodayDate(today)
    if (userProfile) {
      setForename(userProfile.first_name)
    }
  }, [userProfile])

  const getLineChartData = () => {
    const data = {
      labels: Object.keys(weeklyPerformance).reverse(),
      datasets: [
        {
          data: Object.values(weeklyPerformance).reverse(),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "#0c0058"
        }
      ]
    };
    setShowLineChart(true)
    setLineChartData(data)
  }

  const greeting = () => {
    const hour = moment().hour();
    if (hour > 16){
      return "Good evening";
    }
    if (hour > 11){
      return "Good afternoon";
    }
    return 'Good morning';
  }

  const getGetOrdinal = (n) => {
    var s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
 }

  const getPerformanceStudent = () => {
    return (
    <>
      {(topStudentData && topStudentData.length > 0) ?
      <>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th />
              <th className="pl-0">Student</th>
              <th>Year</th>
              <th>Avg. performance</th>
            </tr>
          </thead>
          <tbody>
            {topStudentData.map((obj, idx) => (
            <tr>
              <td scope="row" className="tableRankOuter"><div className="tableRank">{(idx+1) <4 ? <img src="images/star.png" /> : null }<b>{(getGetOrdinal(idx+1))}</b></div></td>
              <td className="tableClientImg"><span style={{ background: 'url("'+ ((typeof obj.profile_image != "undefined" && obj.profile_image != "") ? `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(obj.profile_image)))}` : UserImg) +'")' }} /> {obj.name}</td>
              <td>{obj.year}</td>
              <td>{obj.average}%</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
      :
      <>
      <div className="mt-3 mb-3" style={{textAlign:'center', color: '#0c0058'}}>
        <img src={NoConnections} /> 
        <h4 style={{ color: '#0c0058', marginBottom: "5px", fontFamily: "neue_helveticabold" }}>Nothing new here</h4>
        <p>Assign some work to your class to begin.</p>
      </div>
      </>
      }
    </>
    );
  }

  const getPerformanceTeacher = () => {
    return (
    <>
      {(topTeachertData && topTeachertData.length > 0) ?
      <>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th />
              <th className="pl-0">Teacher</th>
              <th>Subject</th>
              <th>Year</th>
              <th>Avg. performance</th>
            </tr>
          </thead>
          <tbody>
            {topTeachertData.map((obj, idx) => (
            <tr>
              <td scope="row" className="tableRankOuter"><div className="tableRank">{(idx+1) <4 ? <img src="images/star.png" /> : null }<b>{(getGetOrdinal(idx+1))}</b></div></td>
              <td className="tableClientImg"><span style={{ background: 'url("'+ ((typeof obj.profile_image != "undefined" && obj.profile_image != "") ? `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(obj.profile_image)))}` : UserImg) +'")' }} /> {obj.name}</td>
              <td>{obj.subject}</td>
              <td>{obj.year}</td>
              <td>{obj.average}%</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
      :
      <div className="mt-3 mb-3" style={{textAlign:'center', color: '#0c0058'}}>
        <img src={NoConnections} /> 
        <h4 style={{ color: '#0c0058', marginBottom: "5px", fontFamily: "neue_helveticabold" }}>Nothing new here</h4>
        <p>Assign some work to your class to begin.</p>
      </div>      
      }
    </>
    );
  }

  return (
    <React.Fragment>
      {/* { customLoader &&
        <CustomLoader />
      } */}
      <div className="goBack backToClass">{todayDate}</div>
      <h1 className="pageTitle">{greeting()} <b>{forename}</b>
        <div className="exportDataOuter">
          <button className="topButton d-none float-right"><img src="images/export.png" /> Export data</button>
          <div className="formFieldOuter d-none dateTrem">
            <label className="fieldLabel">Data/Terms</label>
            <div className="formField">
              <input type="text" className="fieldInput" placeholder="Jan - Mar 2021" />
              <i className="uil uil-angle-down arrow" />
            </div>
          </div>
        </div>
      </h1>
      <p className="titleInfo">Welcome to your Dashboard.</p>
      <div className="row dashboardSectionRow">
        <div className="col-xl-3 col-md-6 col-12">
          <div className="cardContainer">
            <div className="statsTitle mb-4">
              <label>Total Clients</label>
              <span>{studentStatus ? studentStatus.active_students + studentStatus.inactive_students : 0}</span>
            </div>
            <Pie
              data={studentChartData}
              options={pieOptions}
            />
            {/* <img src="images/graph1.png" className="smallGraph" /> */}
          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-12">
          <div className="cardContainer">
            <div className="statsTitle mb-4">
              <label>Total Registered Candidates</label>
              <span>{teacherStatus ? teacherStatus.active_teachers + teacherStatus.inactive_teachers : 0}</span>
            </div>
            <Pie
              data={teacherChartData}
              options={pieOptions}
            />
            {/* <img src="images/graph2.png" className="smallGraph" /> */}
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="cardContainer schoolPerformanceChart">
            <div className="statsTitle">
              <label>Overall recruitment performance</label>
            </div>
            {(showLineChart) ?
            <>
            <Line 
              data={lineChartData}
              options={lineOptions}
            />
            </>
            :
            <div className="noReminder" style={{background: "#fff", borderRadius: "7px"}}>
              <img style={{width: "120px"}} src={NoDocImg} />
              <h1>No data to show</h1>
              <p style={{color: "#222e68"}}>Assign some work to your class to begin.</p>
            </div>
            }
          </div>
        </div>
      </div>
      {/*<div className="cardContainer p-0">
        <div className="tableFilterTopOuter tabsPerformance" style={{ paddingBottom: "45px"}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Top Performing Students" key="1">
              {getPerformanceStudent()}
            </TabPane>
            
          </Tabs>
        </div>
        
      </div>*/}

    </React.Fragment>
  );
};

export default Dashboard;
