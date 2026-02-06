'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Package, Users, BarChart, Settings, LifeBuoy } from '@deemlol/next-icons';

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <House size={20} /> },
    { name: 'Tickets', href: '/dashboard/tickets', icon: <Package size={20} /> },
    { name: 'Users', href: '/dashboard/users', icon: <Users size={20} /> },
    { name: 'Reports', href: '/dashboard/reports', icon: <BarChart size={20} /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen bg-primary flex flex-col shadow-xl">
            {/* Logo Section */}
            <div className="px-6 py-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-md">
                        <LifeBuoy size={24} color="#14497F" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Helpdesk</h1>
                        <p className="text-xs text-white/60">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4">
                <p className="px-3 mb-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Menu</p>
                <ul className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-white text-[#14497F] shadow-md'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <span className={isActive ? 'text-[#14497F]' : 'text-white/60 group-hover:text-white'}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                    {isActive && (
                                        <span className="ml-auto w-2 h-2 rounded-full bg-[#FFCB05]"></span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 mx-4 mb-4 rounded-xl bg-white/10 border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFCB05] flex items-center justify-center shadow-md">
                        <LifeBuoy size={18} color="#14497F" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Need Help?</p>
                        <p className="text-xs text-white/60">Check documentation</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
