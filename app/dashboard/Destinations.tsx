import { fetch_destinations } from "../api/trip_api"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link';

export default async function Destinations() {

    const session = await getServerSession(authOptions);
    const destinations = await fetch_destinations(session?.accessToken);

    return (
        <>
        Where we fly!!
        <table>
            <thead>
                <tr>
                <th>City</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {destinations &&
                destinations.map((destination) => (
                    <tr key={destination.destination_id}>
                        <td>
                            <Link href={`/city/${destination.destination_id}`}>
                            {destination.city}
                            </Link>
                            </td>
                        <td>{destination.description}</td>
                    </tr>
            ))}
            </tbody>
        </table>
        </>
    )
}