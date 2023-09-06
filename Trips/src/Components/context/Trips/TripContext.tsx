import { createContext, useEffect, useState } from "react";
import { Trip, TripBaseAPI } from "../../models/trip";
import axios, { AxiosResponse } from 'axios';

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
        axios.get(TripBaseAPI)
            .then((data: AxiosResponse<Trip[]>): void => {
                setTrips(data.data);
            }).catch(err => console.error(err));
    }, []);

    return (<TripContext.Provider value={{ trips, setTrips}}>
        {props.children}
    </TripContext.Provider>)
}

export default TripsContextProvider;