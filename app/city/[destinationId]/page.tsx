import CityOverview from "@/app/city/CityOverview";

interface CityProps {
    params: {
        destinationId: number;
    }
}
export default async function City({ params } : CityProps) {
    const { destinationId} = params;

    return (
        <CityOverview destinationId={destinationId} />
    )
}