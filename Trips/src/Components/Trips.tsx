import { useContext } from 'react';
import { nav } from "./models/types";
import { TripContext, TripsContextType } from './context/Trips/TripContext';
import TripDetail from './TripDetail';
import { Trip } from './models/trip';

interface TripProps {
    nav: nav;
}
function Trips({ nav }: TripProps): JSX.Element {
    const context = useContext<TripsContextType | null>(TripContext);
    if (!context) return <div className="error">NO TRIPS DATA</div>
    const { trips } = context;

    return (<>
        <h1>Trips</h1>
        <div className="container fx-wrap">
            {trips && trips.map((trip: Trip, index: number): JSX.Element => {
                return <TripDetail key={'tripCard_' + index} id={trip.id} />
            })}
        </div>
    </>);
}

export default Trips;