import { useSelector } from 'react-redux'
import '../assets/css/Dashboard.css'
import { CgAdd, CgLogOff } from "react-icons/cg";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdBugReport } from "react-icons/md";
import { Outlet } from 'react-router-dom';
function Dashboard() {
  const userData = useSelector((state) => state.UserReducer.userData)


  return (
    <div className='Dashboard'>
      <div className="actionsMenu">
        <p className='greetingPActionMenu'>
          {!userData ? 'Welcome, Jhon Doe' : `Welcome, ${userData.firstname}`}
        </p>
        <div className="actions">
          <button className="btns"><span><FaHome /></span>Home</button>
          <button className="btns"><span><CgAdd /></span> Add Member</button>
          <button className="btns"><span><CgAdd /></span> Add Employe</button>
          <button className="btns"><span><FaClipboardList /></span>Members List</button>
          <button className="btns"><span><FaClipboardList /></span>Employe List</button>
          <button className="btns"><span><IoMdSettings /></span>Account Settings</button>
          <button className="btns"><span><MdBugReport /></span>Reports a bug</button>
          <button className="btns"><span><CgLogOff /></span>Log out</button>
        </div>
      </div>
      <div className="outletView">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard