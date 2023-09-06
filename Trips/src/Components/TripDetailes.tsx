import { Link, useNavigate, useParams } from "react-router-dom";
import { Trip, TripBaseAPI } from "./models/trip";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { TripContext } from "./context/Trips/TripContext";

function TripDetailes() {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const [trip, setTrip] = useState<Trip | null>(null);
    
    useEffect(() => {
        axios.get(TripBaseAPI + '/' + id).then(data => setTrip(data.data));
    }, [id]);
    
    const context = useContext(TripContext);
    if (!context) return <div>Loading...</div>;
    const { trips, setTrips } = context;
    
    if (!trip || !trips) {
        return <div className="error">Trip Not Found</div>;
    }
    const removeTrip = (id: string, auth: string): void => {
        axios.delete(TripBaseAPI + '/' + id,
            {
                headers: { authorization: auth }
            })
            .then(res => {
                setTrips(trips.filter((t: Trip) => t.id !== res.data.id));
            })
            .catch(err => console.log(err));
    }
    return <>
        <div className="trip-page" >
            <Link to='/'>Home</Link>
            <img src={trip.image} alt={trip.name} />
            <div className="container fx-col trip-detailes">
                <h4>{trip.name}</h4>
                <p>Destination: {trip.destination}</p>
                <p>Start Date: {trip.startDate}</p>
                <p>End Date: {trip.endDate}</p>
                <p>Description: {trip.description}</p>
                <p>Price: {trip.price}</p>
                <ul>
                    {trip.activities.map(a => <li key={'activ' + a}>{a}</li>)}
                </ul>
            </div>
            <button onClick={(e) => {
                e.stopPropagation();
                removeTrip(trip.id, 'test-token');
                navigate('/trips');
            }}>Remove</button>
        </div>
    </>;
}

export default TripDetailes;