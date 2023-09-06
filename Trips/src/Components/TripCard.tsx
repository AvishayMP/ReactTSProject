import { useContext } from "react";
import { TripContext, TripsContextType } from "./context/Trips/TripContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { TripBaseAPI } from "./models/trip";

interface TripDetailesProps {
    id?: string;
}

function TripCard({ id }: TripDetailesProps): JSX.Element {
    const context = useContext<TripsContextType | null>(TripContext);
    const navigate = useNavigate();

    if (!context || !context.trips) return <div className="error">NO TRIPS DATA</div>
    const { trips, setTrips } = context!;

    const trip = trips?.find(trip => trip.id == id);

    if (!trip) return <div className="error">NO TRIP FOUND</div>

    const removeTrip = (id: string, auth: string): void => {
        axios.delete(TripBaseAPI + '/' + id,
            {
                headers: { authorization: auth }
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
            navigate('/trip/' + id);
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
                removeTrip(trip.id, 'test-token');
            }}>Remove</button>
        </div>
    </>;
}


export default TripCard;