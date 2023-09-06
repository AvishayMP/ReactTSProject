import { useContext } from 'react';
import 
{ TripContext, TripsContextType } from './context/Trips/TripContext';
import TripCard from './TripCard';
import { Trip } from './models/trip';
import { Link } from 'react-router-dom';

function Trips(): JSX.Element {
    const context = useContext<TripsContextType | null>(TripContext);
    if (!context) return <div className="error">NO TRIPS DATA</div>
    const { trips } = context;

    return (<>
        <Link to="/">Home</Link>
        <Link to="/newtrip">Add new trip</Link>
        <h1>Trips</h1>
        <div className="container fx-wrap">
            {trips && trips.map((trip: Trip): JSX.Element => {
                return <TripCard key={'tripCard_' + trip.id} id={trip.id} />;
            })}
        </div>
    </>);
}

export default Trips;