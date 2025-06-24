import { Destination, Trip } from "trips/utils";

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