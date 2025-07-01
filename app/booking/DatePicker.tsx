import { ChangeEvent, useContext } from "react";
import { BookingContext, BookingContextType } from "./context";



export default function DatePicker() {
    const { setStartDate, setEndDate } = useContext(BookingContext) as BookingContextType;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        if(name === "startDate") setStartDate(value);
        if(name === "endDate") setEndDate(value);
    };

    return (
    <>
        <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
            <input type="date" name="startDate" id="startDate" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
            <input type="date" name="endDate" id="endDate" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
    </>
    )
}