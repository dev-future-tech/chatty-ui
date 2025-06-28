"use client";
import { fetch_destinations } from "../api/trip_api"
import DestinationSelection from './DestinatonSelection';
import BookingForm from "./BookingForm";
import { useEffect, useState } from "react";
import { Destination } from "trips/utils";
import { getSession } from "next-auth/react";
import { BookingProvider } from "./context";

export default function Booking() {
    const [destinations, setDestinations] = useState<Destination[]>([]);

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
            <input name="query" />
            <BookingProvider>
            <BookingForm>
                <DestinationSelection destinationSelection={destinations}></DestinationSelection>
            </BookingForm>
            </BookingProvider>
            
        </>
    )
}