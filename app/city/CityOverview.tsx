import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetch_destination } from '../api/trip_api';

interface CityOverviewProps {
    destinationId: number
}

export default async function CityOverview({destinationId} : CityOverviewProps) {
    const session = await getServerSession(authOptions);
    console.log(`Loading city for overview ${destinationId}`);
    const destination = await fetch_destination(destinationId, session?.accessToken);

    return (
        <>
        <h1>Overview: {destination.city}</h1>
        <div>{destination.description}</div>
        </>
    )
}