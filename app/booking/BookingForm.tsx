"use client";

import { useContext } from "react";
import { BookingContext, BookingContextType } from "./context";
import { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { save_booking } from "../api/trip_api";
import { BookingRequest } from "trips/utils";

interface BookingFormProps {
    children: React.ReactNode
}

export default function BookingForm({ children }: BookingFormProps) {
    const { destinationId, startDate, endDate } = useContext(BookingContext) as BookingContextType;
    const { data: session } = useSession()

    const saveBooking = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`StartDate: ${startDate}, EndDate: ${endDate}, DestId: ${destinationId}, User: ${JSON.stringify(session?.user?.email)}`);
        try {
            const request: BookingRequest = {
                email: session?.user?.email,
                destination_id: destinationId,
                start_date: startDate,
                end_date: endDate
            };
            console.log("Sending save request...: " + JSON.stringify(request));
            const location = await save_booking(request, session?.accessToken);
            console.log("Response received!");
            console.log(`Saved booking ${location}`);
        } catch (error) {
          console.error('Error saving data:', error);
        }
        
    };

    // const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({ ...prevData, [name]: value }));
    // }
    

    return (
    <>
    <h1>Search Flights</h1>
    <div className="w-full max-w-xs">
    <form onSubmit={saveBooking} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    {children}
    <br/>
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
    </div>
    </>
    );
}