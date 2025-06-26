import CityOverview from "@/app/city/CityOverview";

interface CityProps {
    params: {
        destinationId: number;
    }
}
export default async function City({ params } : CityProps) {
    const { destinationId} = await params;

    return (
        <CityOverview destinationId={destinationId} />
    )
}