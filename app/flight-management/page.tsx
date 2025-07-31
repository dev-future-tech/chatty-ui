"use client";
import { useSession } from "next-auth/react";
import jwt from 'jsonwebtoken';

export default function FlightManagement() {
    const { data: session } = useSession();
    const value = session?.accessToken || ''
    const decoded = jwt.decode(value);
    console.log(decoded);
    return (
        <div>
            <h1>Only Admins can access</h1>
        </div>
    )
}