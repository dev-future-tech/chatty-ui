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
        const values = await fetch_destinations(token);
        setDestinations(values);
    }
    useEffect( () => {
        get_destinations();
    }, []);

    return (
        <>
            <BookingProvider>
            <BookingForm>
                <AirportSelection session_token={session?.accessToken}></AirportSelection>
                <DestinationSelection destinationSelection={destinations}></DestinationSelection>
                <DatePicker></DatePicker>
            </BookingForm>
            <Flights email={session?.user?.email} session_token={session?.accessToken}></Flights>
            </BookingProvider>
            
        </>
    )
}