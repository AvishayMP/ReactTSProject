import { useState } from 'react';
import './styles.css';

import Home from './Components/Home';
import UserLogin from './Components/UserLogin';
import Trips from './Components/Trips';
import UserRegistration from './Components/UserRegistration';
import { currentVeiw } from './Components/models/types';
import TripsContextProvider from './Components/context/Trips/TripContext';

function App(): JSX.Element {
  const [current, setCurrent] = useState<currentVeiw>(currentVeiw.Home);

  return (
    <TripsContextProvider>
      {current == currentVeiw.Home && <Home nav={setCurrent} />}
      {current == currentVeiw.AllTrips && <Trips nav={setCurrent} />}
      {current == currentVeiw.LogIn && <UserLogin nav={setCurrent} />}
      {current == currentVeiw.SignIn && <UserRegistration nav={setCurrent} />}
      {current == currentVeiw.Trips && <Trips nav={setCurrent} />}
    </TripsContextProvider>
  )
}

export default App
