import { useContext } from "react";
import { TripContext, TripsContextType } from "./context/Trips/TripContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Trip, TripBaseAPI } from "./models/trip";
import { AuthContext, AuthContextType } from "./context/Trips/AuthContext";


function TripCard({ trip }: { trip: Trip }): JSX.Element {
    const navigate = useNavigate();

    const context = useContext<TripsContextType | null>(TripContext);
    const authContext = useContext<AuthContextType>(AuthContext);

    if (!context || !context.trips) return <div className="error">NO TRIPS DATA</div>
    const { trips, setTrips } = context!;

    if (!authContext) return <div className="error">NO AUTH DATA</div>
    const { token } = authContext;

    const removeTrip = (id: string): void => {
        axios.delete(TripBaseAPI + '/' + id,
            {
                headers: { authorization: token }
            })
            .then(data => {
                console.log('removed:', data);
                setTrips(trips!.filter(trip => trip.id !== id));
            })
            .catch(err => console.log(err));
        setTrips(trips!.filter(trip => trip.id === id));
    }

    return <>
        <div className="trip-card" onClick={(e) => {
            e.stopPropagation();
            navigate('/trip/' + trip.id);
        }}>
            <img src={trip.image} alt={trip.name} />
            <div className="container fx-col trip-detailes">
                <h4>{trip.name}</h4>
                <p>Destination: {trip.destination}</p>
                <p>Start Date: {trip.startDate}</p>
                <p>End Date: {trip.endDate}</p>
            </div>
            <button onClick={(e) => {
                e.stopPropagation();
                removeTrip(trip.id);
            }}>Remove</button>
            <button onClick={(e) => {
                e.stopPropagation();
                navigate(`/updtrip/${trip.id}`);
            }}>Update</button>
        </div>
    </>;
}


export default TripCard;