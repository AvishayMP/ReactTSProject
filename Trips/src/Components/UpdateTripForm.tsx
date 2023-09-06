import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Trip, TripBaseAPI } from "./models/trip";

import axios, { AxiosResponse } from 'axios';
import { TripContext, TripsContextType } from "./context/Trips/TripContext";
import TripCard from "./TripCard";
import { AuthContext, AuthContextType } from "./context/Trips/AuthContext";

function UpdateTripForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState<Partial<Trip | null>>(null);

    const context = useContext<TripsContextType | null>(TripContext);
    if (!context) throw new Error('Conect the context to newTripForm');
    const { trips, setTrips } = context;

    const authContext = useContext<AuthContextType>(AuthContext);
    if (!authContext) throw new Error('Conect the context to newTripForm');
    const { token } = authContext;

    useEffect(() => {
        axios.get(TripBaseAPI + '/' + id).then(data => setTrip(data.data));
    }, [id]);

    const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        axios.put(TripBaseAPI + '/' + trip!.id, trip, { headers: { authorization: token } })
            .then((res: AxiosResponse): void => {
                setTrip(res.data);
                setTrips(trips!.map((t: Trip): Trip => {
                    return (t.id !== trip!.id ? t : trip) as Trip;
                }));
                navigate('/trips');
            })
            .catch(err => console.log(err));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTrip(e.target.name !== 'activities' ? { ...trip, [e.target.name]: e.target.value }
            : {
                ...trip,
                activities: e.target.value.split(',').map((a: string): string => a.trim())
            });
    }

    return (<>
        <form className="trip-page" onSubmit={(e) => {
            handleSubmmit(e);
        }}>
            <Link to='/trips'>Trips</Link>
            {trip ?
                <div className="container fx-col trip-detailes">
                    <input type="text"
                        value={trip.image}
                        name="image"
                        onChange={handleChange}
                        required />
                    <input type="text"
                        value={trip.name}
                        name="name"
                        onChange={handleChange}
                        required />
                    <input type="text"
                        value={trip.destination}
                        name="destination"
                        onChange={handleChange}
                        required />
                    <input type="text"
                        value={trip.startDate}
                        name="startDate"
                        onChange={handleChange}
                        required />
                    <input type="text"
                        value={trip.endDate}
                        name="endDate"
                        onChange={handleChange}
                        required />
                    <input type="text"
                        value={trip.description}
                        name="description"
                        onChange={handleChange}
                        required />
                    <input type="number"
                        value={trip.price}
                        name="price"
                        onChange={handleChange}
                        required />
                    <input type="text"
                        value={trip.activities?.join(', ')}
                        name="activities"
                        onChange={handleChange}
                        required />
                </div> : null}
            <button type="submit">Update</button>
        </form>
        <h2>Preview:</h2>
        {trip && <TripCard trip={trip as Trip} />}
    </>);
}
export default UpdateTripForm;