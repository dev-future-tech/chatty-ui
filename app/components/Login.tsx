"use client"
import { signIn } from "next-auth/react";
export default function Login() {
  return <button onClick={() => signIn("keycloak")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 ml-7">
    Signin with keycloak
  </button>
}