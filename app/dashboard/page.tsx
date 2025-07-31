"use client";
import RecentTrips from "@/app/dashboard/RecentTrips";
import Destinations from "@/app/dashboard/Destinations";

export default function Dashboard() {

    return (
        <>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Dashboard</h1>
        <RecentTrips customerId={1}/>
        <Destinations />
        </>
    );

}