import { fetch_customer_trips } from "@/app/api/trip_api";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface RecentTripsProps {
    customerId: number;
    count?: number;
}

export default async function RecentTrips({customerId, count=10} : RecentTripsProps) {
    const session = await getServerSession(authOptions);

    const trips = await fetch_customer_trips(customerId, count, session?.accessToken);

    return (
        <>
        Your recent trips
                <table>
            <thead>
                <tr>
                    <th>Destinaton</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                {trips && trips.map((trip) => (
                    <tr key={trip.bookingId}>
                        <td>{trip.destination}</td>
                        <td>{trip.start_date}</td>
                        <td>{trip.end_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}