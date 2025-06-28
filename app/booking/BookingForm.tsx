"use client";

import { useContext } from "react";
import { BookingContext, BookingContextType } from "./context";
import { FormEvent, useState } from "react";

interface BookingFormProps {
    children: React.ReactNode
}

interface FormData {
  name: string;
  email: string;
  destinationId: number;
}


export default function BookingForm({ children }: BookingFormProps) {
    const { destinationId } = useContext(BookingContext) as BookingContextType;
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', destinationId: 0 });

    const saveBooking = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data received:', formData);
    }

    // const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({ ...prevData, [name]: value }));
    // }
    

    return (
    <>
    <form onSubmit={saveBooking}>
    {destinationId}
    {children}
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
    </>
    );
}