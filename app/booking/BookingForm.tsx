"use client";

import { useContext } from "react";
import { BookingContext, BookingContextType } from "./context";
import { FormEvent } from "react";
import { useSession } from "next-auth/react";

interface BookingFormProps {
    children: React.ReactNode
}

interface FormData {
  name: string;
  email: string;
  destinationId: number;
}


export default function BookingForm({ children }: BookingFormProps) {
    const { destinationId, startDate, endDate } = useContext(BookingContext) as BookingContextType;
    const { data: session } = useSession()

    const saveBooking = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`StartDate: ${startDate}, EndDate: ${endDate}, DestId: ${destinationId}, User: ${JSON.stringify(session?.user?.email)}`);
    }

    // const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({ ...prevData, [name]: value }));
    // }
    

    return (
    
    <div className="w-full max-w-xs">
    <form onSubmit={saveBooking} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    {destinationId}, {startDate}, {endDate}
    {children}
    <br/>
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
    </div>
    
    );
}