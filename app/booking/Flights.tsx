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
        await listFlights(request, token).then( data => {
            setFlights(data);
        });
    }

    useEffect(() => {
        const request : FlightRequest = {
            destination_id: destinationId,
            email: email,
            origin_id: airportId,
            start_date: startDate,
            end_date: endDate
        };

        if(session_token) {
            getFlights(request, session_token);
        }
    }, [airportId, destinationId, email, startDate, endDate, session_token]);
    

    return <div className="w-4/5 max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 shadow-md rounded">
    <table className="table-auto w-full border-collapse border border-gray-300">
        <caption className="caption-bottom">Flights are subject to last minute changes</caption>
        <thead>
            <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Details</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Basic Economy</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Economy</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Premium Economy</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Business</th>
            </tr>
        </thead>
        <tbody>
            {flights && flights.map( (flight) => (
                <tr key={flight.id} className="hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">{flight.origin.city} - {flight.destination.city} - {flight.departure_date} - {flight.departure_time}</td>
                <td className="border border-gray-300 px-4 py-2">Price 1</td>
                <td className="border border-gray-300 px-4 py-2">Price 2</td>
                <td className="border border-gray-300 px-4 py-2">Price 3</td>
                <td className="border border-gray-300 px-4 py-2">Price 4</td>
                </tr>
            ))}

        </tbody>
    </table>

    </div>
}