import { Head } from './head';

import { Navbar } from '@/components/navbar';

export default function DefaultLayout({
  children,
  showNavbar = true,
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      {showNavbar && <Navbar />}
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
    </div>
  );
}
