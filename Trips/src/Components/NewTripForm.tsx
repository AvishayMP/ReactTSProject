import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Trip, TripBaseAPI } from "./models/trip";

import axios, { AxiosResponse } from 'axios';
import { TripContext, TripsContextType } from "./context/Trips/TripContext";

function NewTripForm() {
    const navigate = useNavigate();
    const [trip, setTrip] = useState<Partial<Trip | null>>(null);
    const context = useContext<TripsContextType | null>(TripContext);
    if (!context) throw new Error('Conect the context to newTripForm');
    const { trips, setTrips } = context;

    const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        axios.post(TripBaseAPI, trip, { headers: { authorization: 'test-token' } })
            .then((res: AxiosResponse): void => {
                setTrip(res.data);
                setTrips([...trips!, { ...res.data }]);
                console.log(trips);
                navigate('/trips');
            })
            .catch(err => console.log(err));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTrip(e.target.name !== 'activities' ? { ...trip, [e.target.name]: e.target.value }
            : {
                ...trip,
                activities: e.target.value.split(',').map((a: string): string => a.trim())
            }
        );
    }
    return (<>
        <form className="trip-page" onSubmit={(e) => {
            handleSubmmit(e);
        }}>
            <Link to='/trips'>Trips</Link>
            <div className="container fx-col trip-detailes">
                <input type="text"
                    value={trip?.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    placeholder="image URL" required />
                <input type="text"
                    value={trip?.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="name" required />
                <input type="text"
                    value={trip?.destination}
                    name="destination"
                    onChange={(e) => handleChange(e)}
                    placeholder="Destination" required />
                <input type="text"
                    value={trip?.startDate}
                    name="startDate"
                    onChange={(e) => handleChange(e)}
                    placeholder="startDate" required />
                <input type="text"
                    value={trip?.endDate}
                    name="endDate"
                    onChange={(e) => handleChange(e)}
                    placeholder="endDate" required />
                <input type="text"
                    value={trip?.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                    placeholder="description" required />
                <input type="number"
                    value={trip?.price}
                    name="price"
                    onChange={(e) => handleChange(e)}
                    placeholder="price" required />
                <input type="text"
                    value={trip?.activities}
                    name="activities"
                    onChange={(e) => handleChange(e)}
                    placeholder="Hiking, Scuba Diving, Surfing" />
            </div>
            <button type="submit">Add</button>
        </form></>);
}
export default NewTripForm;