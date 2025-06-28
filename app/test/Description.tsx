"use client";

interface DescriptionProps {
    description: string
};

export default function Description({ description }: DescriptionProps) {

    const passValue = () => {
        //do something
    };

    return (
        <>
        <p>{description}</p>
        <button onClick={passValue} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click Me!</button>
        </>
    )
}