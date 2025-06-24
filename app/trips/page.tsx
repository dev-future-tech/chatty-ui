import  { Trip } from "trips/utils";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function loadTrips(customerId: number, token?: string) {

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...({}), // Merge existing headers
    };

    if(token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const results = await fetch(`http://localhost:8070/booking/${customerId}`,{
        headers
    });

    const vals = await results.json() as Promise<Trip[]>;
    return vals;
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    const trips = await loadTrips(1, session?.accessToken);

    return (
    <div>
        <h1>Your Trips</h1>
        {session && (
        <div>
            {session.user?.email}
        </div>
        )}
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
    </div>
    )
}