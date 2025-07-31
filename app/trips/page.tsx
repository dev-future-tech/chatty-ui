import  { Trip } from "trips/utils";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/config/authOptions';

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
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Trips</h1>
        <h2 className="text-4xl font-extrabold dark:text-white">Your Trips</h2>
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
    </div>
    )
}