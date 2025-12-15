import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './App.css'
import Authentication from './pages/Authentication'
import Home from './pages/Home'
import OwnerDashboard from './pages/OwnerDashboard'
import UserDashboard from './pages/UserDashboard'
import Bookings from './components/userComponents/Bookings'
import History from './components/userComponents/History'
import TurfDetails from './components/userComponents/TurfDetails'
import OwnerTurf from './components/ownerComponents/OwnerTurf'
import AboutPage from './components/homeComponents/AboutPage'
import Contact from './components/homeComponents/Contact'
import AddBooking from './components/userComponents/AddBooking'
import ManageBookings from './components/ownerComponents/ManageBookings'
import BookingHistory from './components/ownerComponents/BookingHistory'
import AllBookings from './components/ownerComponents/AllBookings'
import AddTurf from './components/ownerComponents/AddTurf'
import OwnerProfile from './components/ownerComponents/OwnerProfile'
import AdminDashboard from './pages/AdminDashboard'
import AdminAllowner from './components/AdminComponents/AdminAllowner'
import AdminAllusers from './components/AdminComponents/AdminAllusers'
import AdminAllTurfs from './components/AdminComponents/AdminAllTurfs'
import AdminBookings from './components/AdminComponents/AdminBookings'
import Body from './components/Body'
import UserBody from './components/UserBody'
import OwnerBody from './components/OwnerBody'
import AdminBody from './components/AdminBody'
import UserProfile from './components/userComponents/UserProfile'
import OwnerView from './components/AdminComponents/OwnerView'
import UserView from './components/AdminComponents/UserView'
import Creator from './pages/Creator'
import ManageTurf from './components/ownerComponents/ManageTurf'

function App() {

  return (
    <>
      <div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <BrowserRouter>
        <Routes>
            <Route path='/register' element={<Authentication isNewUser={true}/>}/>
            <Route path='/login' element={<Authentication/>}/>
            <Route path='/Creator' element={<Creator/>}/>
            
            
            <Route path='/' element={<Body/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/contacts' element={<Contact/>}/>
           
            <Route path='/user' element={<UserBody/>}>
            <Route path='/user/dashboard' element={<UserDashboard/>}/>
            <Route path='/user/turf/:turfId' element={<TurfDetails/>}/>
            <Route path='/user/all-bookings' element={<Bookings/>}/>
            <Route path='/user/history' element={<History/>}/>
            <Route path='/user/profile' element={<UserProfile/>}/>
            </Route>
          
            <Route path='/owner' element={<OwnerBody/>}>
            <Route path='/owner/dashboard' element={<OwnerDashboard/>}/>
            <Route path='/owner/myturfs' element={<OwnerTurf/>}/>
            <Route path='/owner/turf/:id' element={<ManageTurf/>}/>
            <Route path='/owner/myturfs/:turfId' element={<ManageBookings />}/>
            <Route path='/owner/myturfs/myhistory/:turfId' element={<BookingHistory/>}/>
            <Route path='/owner/allbookings' element={<AllBookings/>}/> 
            <Route path='/owner/addturf' element={<AddTurf/>}/>
            <Route path='/owner/profile' element={<OwnerProfile/>}/>

            </Route>

            <Route path='/admin' element={<AdminBody/>}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/allowners' element={<AdminAllowner/>}/>
            <Route path='/admin/allusers' element={<AdminAllusers/>}/>
            <Route path='/admin/allturfs' element={<AdminAllTurfs/>}/>
            <Route path='/admin/allbookings' element={<AdminBookings/>}/>
            <Route path='/admin/ownerview/:ownerId' element={<OwnerView/>}/>
            <Route path='/admin/userview/:userId' element={<UserView/>}/>
            </Route>


            </Route>
          
        </Routes>
        </BrowserRouter>
        
      </div>
  
    </>
  )
}

export default App
