import { ChangeEvent, useState } from "react";


interface FormData {
    month: number;
    day: number;
    year: number;
}

interface Month {
    id: number;
    name: string;
}

const MONTHS : Month[] = [
    { id: 1, name: "January"},
    { id: 2, name: "February"},
    { id: 3, name: "March"},
    { id: 4, name: "April"},
    { id: 5, name: "May"},
    { id: 6, name: "June"},
    { id: 7, name: "July"},
    { id: 8, name: "August"},
    { id: 9, name: "September"},
    { id: 10, name: "October"},
    { id: 11, name: "November"},
    { id: 12, name: "December"}
];

export default function DatePicker() {
    const [formData, setFormData] = useState<FormData>({ month: 0, day: 0, year: 0 });

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        const {name, value} = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return <>
    <select name="month" onChange={handleChange}>
        {MONTHS.map( (month) => (
            <option key={month.id} value={month.id}>{month.name}</option>
        ))}
    </select>
    <select name="day" onChange={handleChange}></select>
    <select name="year" onChange={handleChange}></select>
    </>
}