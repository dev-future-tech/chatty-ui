"use client";

import { Destination } from "trips/utils"
import Description from "./Description";
import { TestContext, TestContextType } from "./test_context";
import { useContext } from "react";

interface DisplayProps {
    destinations: Destination[]
};



export default function Display({destinations} : DisplayProps) {

    const { saveMessage } = useContext(TestContext) as TestContextType;

    const handleClick = () => {
        saveMessage("This is complex");
    };

    return (
        <>
        {destinations &&
        destinations.map( (dest) => (
            <>
            <p key={dest.destination_id}>{dest.city}</p>
            <button onClick={handleClick} type="button">Try me now!</button>
            <Description description={dest.description} />
            </>
        ))}

        </>
    )
}