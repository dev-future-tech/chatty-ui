'use server';

import { BookingRequest, Destination, FlightRequest, Trip } from "trips/utils";

function getHeaders(sessionToken?: string) {
        const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...({}), // Merge existing headers
    };

    if(sessionToken) {
        headers['Authorization'] = `Bearer ${sessionToken}`;
    }
    return headers;
}

export async function fetch_destination(destinationId: number, sessionToken?: string) {
    const headers = getHeaders(sessionToken);

    const destinations = await fetch(`http://localhost:8070/destinations/${destinationId}`, {
        headers
    });
    const results = await destinations.json() as Promise<Destination>
    return results;

}

export async function fetch_destinations(sessionToken?: string) {
    const headers = getHeaders(sessionToken);

    const destinations = await fetch(`http://localhost:8070/destinations`, {
        headers
    });
    const results = await destinations.json() as Promise<Destination[]>
    return results;
}


export async function fetch_customer_trips(customerId: number, count: number, sessionToken?: string) {

    const headers = getHeaders(sessionToken);


    const results = await fetch(`http://localhost:8070/booking/${customerId}`, {
        headers
    });
    const vals = await results.json() as Promise<Trip[]>;
    return vals;
}


export async function save_booking(request: BookingRequest, sessionToken: string | undefined) {
    const headers = getHeaders(sessionToken);


    const options : RequestInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(request)
    };

    const response = await fetch(`http://localhost:8070/booking`, options)
    return response.headers.get("Location");
}

export async function listAirports(sessionToken: string | undefined) {
    const headers = getHeaders(sessionToken);

    const options : RequestInit = {
        method: "GET",
        headers: headers,
    };

        const response = await fetch(`http://localhost:8070/airport`, options);

    if(!response.ok) {
        if (response.status === 400) {
            console.log("Bad request");
            return []
        } else
        if (response.status === 404) {
            console.log("Not Found error");
            return [];
        }
    } else {
        return (await response).json();
    }

}

export async function listFlights(flightRequest: FlightRequest, sessionToken: string | undefined) {
    const headers = getHeaders(sessionToken);

    const options : RequestInit = {
        method: "GET",
        headers: headers,
    };

    const response = await fetch(`http://localhost:8070/flight?airport_id=${flightRequest.origin_id}`, options);

    if(!response.ok) {
        if (response.status === 400) {
            console.log("Bad request");
            return []
        } else
        if (response.status === 404) {
            console.log("Not Found error");
            return [];
        }
    } else {
        return (await response).json();
    }
}