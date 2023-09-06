import './styles.css';

import Home from './Components/Home';
import UserLogin from './Components/UserLogin';
import Trips from './Components/Trips';
import UserRegistration from './Components/UserRegistration';
import TripsContextProvider from './Components/context/Trips/TripContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewTripForm from './Components/NewTripForm';
import TripDetailes from './Components/TripDetailes';
import UpdateTripForm from './Components/UpdateTripForm';
import AuthContextProvider from './Components/context/Trips/AuthContext';

function App(): JSX.Element {
  return (<TripsContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<>404 Page Not Found</>} />
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />

          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegistration />} />

          <Route path="/newtrip" element={<NewTripForm />} />
          <Route path="/updtrip/:id" element={<UpdateTripForm />} />
          <Route path="/trip/:id" element={<TripDetailes />} />
        </Routes>
      </BrowserRouter >
    </AuthContextProvider>
  </TripsContextProvider>
  )
}

export default App
