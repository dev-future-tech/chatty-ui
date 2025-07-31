"use client";

import ChatDialog from "./ui/ChatDialog";
import Logout from './components/Logout'
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    return (
      <div>
        <div>Your name is {session?.user?.name}</div>
        <ChatDialog />
        <div><Logout /> </div>
      </div>
    );
}
