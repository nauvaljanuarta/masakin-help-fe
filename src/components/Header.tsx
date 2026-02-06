'use client';

import { Search, Bell, LogOut } from '@deemlol/next-icons';

interface HeaderProps {
    title: string;
    subtitle: string;
    user: {
        name: string;
        role: string;
    };
    onLogout: () => void;
}

export default function Header({ title, subtitle, user, onLogout }: HeaderProps) {
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div className="px-8 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 px-4 py-2.5 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#14497F] focus:ring-2 focus:ring-[#14497F]/20 transition"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2.5 text-gray-600 hover:text-[#14497F] hover:bg-[#14497F]/5 rounded-xl transition">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#E62B2B] rounded-full"></span>
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="w-10 h-10 rounded-xl bg-[#14497F] flex items-center justify-center text-white font-bold shadow-md">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="ml-2 p-2.5 text-gray-400 hover:text-[#E62B2B] hover:bg-[#E62B2B]/5 rounded-xl transition"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
