import Link from 'next/link';
import Logo from '@/app/logo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/config/authOptions';
import Logout from '../components/Logout';

type NavItem = {
  href: string;
  name: string;
};

export default async function NavBar() {
    const items : NavItem[] = [
      { href: "/dashboard", name: "Dashboard"},
      { href: "/trips", name: "Trips"},
      { href: "/booking", name: "Booking" },
      { href: "/contacts", name: "Contacts" },
      { href: "/chat", name: "Chat"}
    ];

    
    const session = await getServerSession(authOptions);
    


    return (
<>
        <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <ul className="hidden md:flex gap-x-6 text-white">
              {session && items && items.map( (item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <p>{item.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Logout />
          </div>
        </div>
      </div>
        </>
            );
};