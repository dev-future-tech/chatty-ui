import ChatDialog from "./ui/ChatDialog";
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Login from './components/Login'
import Logout from './components/Logout'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session) {
    return (
    <div>
      <div>Your name is {session.user?.name}</div>
      <ChatDialog />
      <div><Logout /> </div>
    </div>
    );
  } else {
    return (
      <div>
        <Login />
      </div>
    );
  }
}
