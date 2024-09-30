import { useSelector } from 'react-redux'
import '../assets/css/Dashboard.css'
import { CgAdd, CgLogOff } from "react-icons/cg";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdBugReport } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';
function Dashboard() {
  const userData = useSelector((state) => state.UserReducer.userData)


  return (
    <div className='Dashboard'>
      <div className="actionsMenu">
        <p className='greetingPActionMenu'>
          {!userData ? 'Welcome, Jhon Doe' : `Welcome, ${userData.firstname}`}
        </p>
        <div className="actions">
          <NavLink
            to=""
            className="btns"
          >
            <span><FaHome /></span> Home
          </NavLink>
          <NavLink
            to="addMember"
            className="btns"
          >
            <span><CgAdd /></span> Add Member
          </NavLink>
          <NavLink
            to="addEmployee"
            className="btns"
          >
            <span><CgAdd /></span> Add Employee
          </NavLink>
          <NavLink
            to="membersList"
            className="btns"
          >
            <span><FaClipboardList /></span> Members List
          </NavLink>
          <NavLink
            to="employeeList"
            className="btns"
          >
            <span><FaClipboardList /></span> Employee List
          </NavLink>
          <NavLink
            to="accountSettings"
            className="btns"
          >
            <span><IoMdSettings /></span> Account Settings
          </NavLink>
          <NavLink
            to="/reportBug"
            className="btns"
          >
            <span><MdBugReport /></span> Report a Bug
          </NavLink>
          <NavLink
            to="/logout"
            className="btns"
          >
            <span><CgLogOff /></span> Log Out
          </NavLink>
        </div>
      </div>
      <div className="outletView">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard