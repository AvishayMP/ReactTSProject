import { useContext } from "react";
import { TripContext, TripsContextType } from "./context/Trips/TripContext";

interface TripDetailesProps {
    id: string;
}
function TripDetailes({ id }: TripDetailesProps): JSX.Element {

    const context = useContext<TripsContextType | null>(TripContext);

    if (!context || !context.trips) return <div className="error">NO TRIPS DATA</div>
    const { trips } = context!;
    const trip = trips?.find(trip => trip.id == id);

    if (!trip) return <div className="error">NO TRIPS FOUND</div>

    return <>
        <div className="tripCard">
            <img src={trip.image} alt={trip.name} />
            <div className="container fx-col trip-detailes">
                <h4>{trip.name}</h4>
                <p>Destination: {trip.destination}</p>
                <p>Start Date: {trip.startDate}</p>
                <p>End Date: {trip.endDate}</p>
                <p>Description: {trip.description}</p>
                <p>Price: {trip.price}</p>
            </div>
        </div>
    </>;
}


export default TripDetailes;