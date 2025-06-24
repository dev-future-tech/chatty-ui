import RecentTrips from "@/app/dashboard/RecentTrips";
import Destinations from "@/app/dashboard/Destinations";

export default async function Dashboard() {

    return (
        <>
        <h1>Dashboard</h1>
        <RecentTrips customerId={1}/>
        <Destinations />
        </>
    );

}