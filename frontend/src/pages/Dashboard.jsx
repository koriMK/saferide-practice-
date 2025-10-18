import { useAuth } from '../context/AuthContext'
import UserDashboard from '../components/UserDashboard'
import DriverDashboard from '../components/DriverDashboard'
import AdminDashboard from '../components/AdminDashboard'

const Dashboard = () => {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case 'user':
      return <UserDashboard />
    case 'driver':
      return <DriverDashboard />
    case 'admin':
      return <AdminDashboard />
    default:
      return <div>Invalid role</div>
  }
}

export default Dashboard