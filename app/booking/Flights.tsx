import { Flight, FlightRequest } from "trips/utils"
import { listFlights } from "../api/trip_api"
import { useContext, useEffect, useState } from "react"
import { BookingContext, BookingContextType } from "./context"

interface FlightProps {
    session_token?: string
    email: string | null | undefined
};

export default function Flights({email, session_token} : FlightProps) {
    const { airportId, destinationId, startDate, endDate } = useContext(BookingContext) as BookingContextType;
    const [flights, setFlights] = useState<Flight[]>([]);

    const getFlights = async (request: FlightRequest, token: string) => {
        const results = await listFlights(request, token);
        setFlights(results)
    }

    useEffect(() => {
        const request : FlightRequest = {
            destination_id: destinationId,
            email: email,
            origin_id: airportId,
            start_date: startDate,
            end_date: endDate
        };

        if(session_token)
            getFlights(request, session_token);
    }, [airportId, destinationId, email, startDate, endDate, session_token]);
    

    return <ul>
    
    {flights && flights.map( (flight) => (
        <li key={flight.id}>{flight.origin.city} - {flight.destination.city} - {flight.departure_date} - {flight.departure_time}</li>
    ))}
    </ul>
}