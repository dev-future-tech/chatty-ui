"use server";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/config/authOptions';
import { fetch_destinations } from "../api/trip_api"
import Display from "./Display";

export default async function Test() {

    const session = await getServerSession(authOptions);
    const dests = await fetch_destinations(session?.accessToken);

    return (
        <Display destinations={dests} />
    )
}