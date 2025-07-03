"use client";

import { ChangeEvent, useContext, useState } from "react";
import { Destination } from "trips/utils";
import { BookingContext, BookingContextType } from "./context";

interface DestinationData {
    destination_id : number
}

interface DestinationProps {
    destinationSelection: Destination[]
}

export default function DestinationSelection({destinationSelection} :  DestinationProps) {

    const [data, setData] = useState<DestinationData>();
    const {setDestinationId } = useContext(BookingContext) as BookingContextType;


    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        setData({"destination_id": Number(event.target.value)});
        setDestinationId(Number(event.target.value));
    }

    return (
        <div className="max-w-xs md:max-w-lg mx-auto">
                <div className="inline-block relative w-64 mb-10">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
                        Destination
                    </label>
                    <select className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='destination' value={data?.destination_id} onChange={handleChange}>
                        {destinationSelection && destinationSelection.map( (dst) => (
                            <option key={dst.destination_id} value={dst.destination_id}>{dst.city}</option>
                        ))}
                    </select>
                </div>
        </div>
    )
}