"use client";
import { fetch_destinations } from "../api/trip_api"
import DestinationSelection from './DestinatonSelection';
import BookingForm from "./BookingForm";
import { useEffect, useState } from "react";
import { Destination } from "trips/utils";
import { getSession, useSession } from "next-auth/react";
import { BookingProvider } from "./context";
import DatePicker from "./DatePicker";
import Flights from "./Flights";
import AirportSelection from "./AirportSelection";

export default function Booking() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const { data: session } = useSession()

    const get_destinations = async () => {
        const sessionLocal = await getSession()
        const token = sessionLocal?.accessToken;
        await fetch_destinations(token).then(values => {
            setDestinations(values);
        });

    }
    useEffect( () => {
        get_destinations();
    }, []);

    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Search Flights</h1>
            <BookingProvider>
            <div className="w-full h-auto border border-gray-300 mt-20 flex">
                <BookingForm>
                    <AirportSelection session_token={session?.accessToken}></AirportSelection>
                    <DestinationSelection destinationSelection={destinations}></DestinationSelection>
                    <DatePicker></DatePicker>
                </BookingForm>
                <Flights email={session?.user?.email} session_token={session?.accessToken}></Flights>
            </div>
            </BookingProvider>
            
        </>
    )
}