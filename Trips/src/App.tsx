import './styles.css';

import Home from './Components/Home';
import UserLogin from './Components/UserLogin';
import Trips from './Components/Trips';
import UserRegistration from './Components/UserRegistration';
import TripsContextProvider from './Components/context/Trips/TripContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewTripForm from './Components/NewTripForm';
import TripDetailes from './Components/TripDetailes';

function App(): JSX.Element {
  const isLoged = true;
  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trips"
        element={<TripsContextProvider>{isLoged && <Trips />}</TripsContextProvider>} />

      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegistration />} />

      <Route path="/newtrip" element={<TripsContextProvider><NewTripForm /></TripsContextProvider>} />
      <Route path="/trip/:id"
        element={<TripsContextProvider><TripDetailes /></TripsContextProvider>} />
    </Routes>
  </BrowserRouter >
  )
}

export default App
