import Link from 'next/link';
import Button from "@/app/button";
import Logo from '@/app/logo';

export default async function NavBar() {
    return (
        <>
        <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/dashboard">
                  <p>Dashboard</p>
                </Link>
              </li>
              <li>
                <Link href="/trips">
                  <p>Trips</p>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <p>Book a Trip</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>
            </ul>
            <Button />
          </div>
        </div>
      </div>
        </>
    );
};