"use client";
import { fetch_destinations } from "../api/trip_api"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Destination } from "trips/utils";

export default function Destinations() {
    const [ destinations, setDestinations] = useState<Destination[]>([]);

    const { data: session } = useSession();
    const accessToken = session?.accessToken === undefined ? '' : session.accessToken;

    useEffect( () => {
        const getDestinations = async (token: string) => {
            await fetch_destinations(token).then(data => {
                setDestinations(data);
            });
        };

        if(accessToken) {
            getDestinations(accessToken);
        }

    }, [accessToken]);

    return (
        <>
        <h2 className="text-4xl font-extrabold dark:text-white">Where we fly!!</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
            </thead>
            <tbody>
            {destinations &&
                destinations.map((destination) => (
                    <tr key={destination.destination_id} className="hover:bg-gray-200">
                        <td className="border border-gray-300 px-4 py-2">
                            <Link href={`/city/${destination.destination_id}`}>
                            {destination.city}
                            </Link>
                            </td>
                        <td className="border border-gray-300 px-4 py-2">{destination.description}</td>
                    </tr>
            ))}
            </tbody>
        </table>
        </>
    )
}