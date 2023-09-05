import { createContext, useEffect, useState } from "react";
import { Trip } from "../../models/trip";

export interface TripsContextProviderProps {
    children: React.ReactNode;
}

export interface TripsContextType {
    trips: Trip[] | undefined;
    setTrips: (trip: Trip[]) => void;
}
export const TripContext = createContext<TripsContextType | null>(null);

function TripsContextProvider(props: TripsContextProviderProps) {
    const [trips, setTrips] = useState<Trip[] | undefined>(undefined);

    useEffect(() => {
        fetch("http://localhost:3000/api/trips").then(res => {
            if (res.ok) {
                console.log(res);
                return res.json();
            }
        }).then(data => {
            if (data) {
                console.log('data loaded:' + data);
                setTrips(data);
            }
        }).catch(err => console.error(err));
    }, []);

    return (<TripContext.Provider value={{ trips, setTrips }}>
        {props.children}
    </TripContext.Provider>)
}

export default TripsContextProvider;