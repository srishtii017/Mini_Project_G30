import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContextProvider.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import PlacesPage from './pages/PlacesPage.jsx'
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from './pages/PlacePage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;


function App() {


  return (
    <UserContextProvider className="scrollbar-hide">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={ <ProfilePage />} />
          <Route path='/account/places' element={ <PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlacePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </UserContextProvider>

  )
}

export default App
