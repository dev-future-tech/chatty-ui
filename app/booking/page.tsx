import { FormEvent } from 'react'

export default async function Booking() {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData,
        });
 
    // Handle response if necessary
        const data = await response.json()
    }

    return (
        <>
        <form onSubmit={onSubmit}>
            <input name="query" />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}