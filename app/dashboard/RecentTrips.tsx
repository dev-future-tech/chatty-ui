"use client";

import { fetch_customer_trips } from "@/app/api/trip_api";
import { useSession } from "next-auth/react";
import { Trip } from "trips/utils";
import { useEffect, useState } from "react";

interface RecentTripsProps {
    customerId: number;
    count?: number;
}

export default function RecentTrips({customerId, count=10} : RecentTripsProps) {
    const {data: session } = useSession();
    const [ trips, setTrips ] = useState<Trip[]>([])

    const accessToken = session?.accessToken === undefined ? '' : session.accessToken;

    useEffect( () => {
        const getTrips = async (customerId: number, count: number, accessToken: string) => {
            await fetch_customer_trips(customerId, count, accessToken).then( data => {
                setTrips(data);
            });
        };

        if (accessToken)
            getTrips(customerId, count, accessToken);
        
    }, [customerId, count, accessToken]);
    

    return (
        <>
        <h2 className="text-4xl font-extrabold dark:text-white">Your recent trips</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Destinaton</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
                </tr>
            </thead>
            <tbody>
                {trips && trips.map((trip) => (
                    <tr key={trip.bookingId} className="hover:bg-gray-200">
                        <td className="border border-gray-300 px-4 py-2">{trip.destination}</td>
                        <td className="border border-gray-300 px-4 py-2">{trip.start_date}</td>
                        <td className="border border-gray-300 px-4 py-2">{trip.end_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}