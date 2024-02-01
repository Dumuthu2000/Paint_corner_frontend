import './dashboard.css'
import Drawer from '../../components/Drawer/Drawer'
import Navbar from '../../components/Navbar/Navbar'

const Dashboard = () => {
  return (
    <div className="dashboardMainContainer">
        <Drawer/>
        <div className="dashboardContainer">
            <Navbar className='navbarComponent' text="Dashboard"/>

            {/* Dashboard items in here*/}
        </div>
    </div>
  )
}

export default Dashboard
