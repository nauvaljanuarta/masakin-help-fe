'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Package, Users, BarChart, Settings, LifeBuoy, ChevronDown } from '@deemlol/next-icons';

interface SubNavItem {
    name: string;
    href: string;
}

interface NavItem {
    name: string;
    href?: string;
    icon: React.ReactNode;
    subItems?: SubNavItem[];
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <House size={20} /> },
    {
        name: 'Tickets',
        icon: <Package size={20} />,
        subItems: [
            { name: 'All Tickets', href: '/tickets' },
            { name: 'Open', href: '/tickets?status=open' },
            { name: 'In Progress', href: '/tickets?status=in-progress' },
            { name: 'Resolved', href: '/tickets?status=resolved' },
        ]
    },
    {
        name: 'Users',
        icon: <Users size={20} />,
        subItems: [
            { name: 'All Users', href: '/users' },
            { name: 'Admins', href: '/users?role=admin' },
            { name: 'Agents', href: '/users?role=agent' },
        ]
    },
    {
        name: 'Reports',
        icon: <BarChart size={20} />,
        subItems: [
            { name: 'Overview', href: '/reports' },
            { name: 'Performance', href: '/reports/performance' },
            { name: 'Analytics', href: '/reports/analytics' },
        ]
    },
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpand = (itemName: string) => {
        setExpandedItems(prev =>
            prev.includes(itemName)
                ? prev.filter(name => name !== itemName)
                : [...prev, itemName]
        );
    };

    const isItemActive = (item: NavItem) => {
        if (item.href) {
            return pathname === item.href;
        }
        if (item.subItems) {
            return item.subItems.some(sub => pathname.startsWith(sub.href.split('?')[0]));
        }
        return false;
    };

    const isSubItemActive = (href: string) => {
        const basePath = href.split('?')[0];
        return pathname === basePath || pathname.startsWith(basePath);
    };

    return (
        <aside className="w-64 min-h-screen bg-primary flex flex-col shadow-xl">
            <div className="px-6 py-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-md">
                        <LifeBuoy size={24} color="#14497F" />
                    </div>
                    <div>
                        <img src="" alt="" />
                        {/* <h1 className="text-lg font-bold text-white">Helpdesk</h1>
                        <p className="text-xs text-white/60">Admin Panel</p> */}
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4">
                <p className="px-3 mb-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Menu</p>
                <ul className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = isItemActive(item);
                        const isExpanded = expandedItems.includes(item.name);
                        const hasSubItems = item.subItems && item.subItems.length > 0;

                        return (
                            <li key={item.name}>
                                {hasSubItems ? (
                                    <button
                                        onClick={() => toggleExpand(item.name)}
                                        className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <span className={isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}>
                                            {item.icon}
                                        </span>
                                        {item.name}
                                        <ChevronDown
                                            size={16}
                                            className={`ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href || '#'}
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
                                )}

                                {hasSubItems && (
                                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <ul className="mt-1 ml-4 pl-4 border-l border-white/20 space-y-1">
                                            {item.subItems!.map((subItem) => {
                                                const isSubActive = isSubItemActive(subItem.href);
                                                return (
                                                    <li key={subItem.href}>
                                                        <Link
                                                            href={subItem.href}
                                                            className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isSubActive
                                                                ? 'bg-white text-[#14497F] font-medium shadow-sm'
                                                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
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
