import { ChangeEvent, useContext, useEffect, useState } from "react";
import { listAirports } from "../api/trip_api"
import { Airport } from "trips/utils";
import { BookingContext, BookingContextType } from "./context";

interface AirportData {
    airportId: number;
}

interface AirportProps {
    session_token: string | undefined;
};

export default function AirportSelection({ session_token } : AirportProps) {
    const [airports, setAirports] = useState<Airport[]>([]);
    const [data, setData] = useState<AirportData>();
    const { setAirportId } = useContext(BookingContext) as BookingContextType;

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        setData({"airportId": Number(event.target.value)});
        setAirportId(Number(event.target.value));
    }


    useEffect( () => {
        const getAirports = async(token: string) => {
            const results = await listAirports(token);
            setAirports(results);
        }

        if(session_token)
            getAirports(session_token);
    }, [setAirportId, session_token]);

    useEffect( () => {
            setAirportId(airports[0]?.airport_id);

    }, [setAirportId, airports]);

    return <>
        <div className="max-w-xs md:max-w-lg mx-auto">
            <div className="inline-block relative w-64 mb-10">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airport">
                    Airport
                </label>
                <select className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="airport" value={data?.airportId} onChange={handleChange}>
                {airports && airports.map( (airport) => (
                    <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
                ))}
                </select>
            </div>
        </div>
        </>
}