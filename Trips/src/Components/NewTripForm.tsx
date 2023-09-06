import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Trip, TripBaseAPI } from "./models/trip";

import axios, { AxiosResponse } from 'axios';
import { TripContext, TripsContextType } from "./context/Trips/TripContext";
import { AuthContext, AuthContextType } from "./context/Trips/AuthContext";
import TripCard from "./TripCard";

function NewTripForm() {
    const navigate = useNavigate();
    const [trip, setTrip] = useState<Trip>({
        id: '',
        name: '',
        destination: '',
        startDate: '',
        endDate: '',
        description: '',
        price: 0,
        image: '',
        activities: []
    });

    const context = useContext<TripsContextType | null>(TripContext);
    if (!context) throw new Error('Conect the context to newTripForm');
    const { trips, setTrips } = context;

    const authContext = useContext<AuthContextType>(AuthContext);
    const { token } = authContext;

    const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        axios.post(TripBaseAPI, trip, { headers: { authorization: token } })
            .then((res: AxiosResponse): void => {
                setTrip(res.data);
                setTrips([...trips!, { ...res.data }]);
                console.log(trips);
                navigate('/trips');
            })
            .catch(err => console.log(err));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTrip(e.target.name !== 'activities'? { ...trip, [e.target.name]: e.target.value }
            : {
                ...trip,
            activities: e.target.value.split(',').map((a: string): string => a.trim())
    }
        );
}
return (<>
    <form className="trip-page" onSubmit={handleSubmmit}>
        <Link to='/trips'>Trips</Link>
        <div className="container fx-col trip-detailes">
            <input type="text"
                value={trip.image}
                name="image"
                onChange={handleChange}
                placeholder="image URL" required />
            <input type="text"
                value={trip.name}
                name="name"
                onChange={handleChange}
                placeholder="name" required />
            <input type="text"
                value={trip.destination}
                name="destination"
                onChange={handleChange}
                placeholder="Destination" required />
            <input type="text"
                value={trip.startDate}
                name="startDate"
                onChange={handleChange}
                placeholder="startDate" required />
            <input type="text"
                value={trip.endDate}
                name="endDate"
                onChange={handleChange}
                placeholder="endDate" required />
            <input type="text"
                value={trip.description}
                name="description"
                onChange={handleChange}
                placeholder="description" required />
            <input type="number"
                value={trip.price}
                name="price"
                onChange={handleChange}
                placeholder="price" required />
            <input type="text"
                value={trip.activities}
                name="activities"
                onChange={handleChange}
                placeholder="Hiking, Scuba Diving, Surfing" />
        </div>
        <button type="submit">Add</button>
    </form>
    <h2>Preview:</h2>
    {trip && <TripCard trip={trip as Trip} />}</>);
}
export default NewTripForm;