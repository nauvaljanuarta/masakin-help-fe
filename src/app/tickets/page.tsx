'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import TicketRow from '@/components/dashboard/TicketRow';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PageTransition from '@/components/common/PageTransition';
import { logout } from '@/lib/api/auth';

interface User {
    name: string;
    role: string;
}

const tickets = [
    { id: '#1234', title: 'Unable to login to account', status: 'Open' as const, priority: 'High' as const, time: '5m ago' },
    { id: '#1233', title: 'Payment failed on checkout', status: 'In Progress' as const, priority: 'Medium' as const, time: '1h ago' },
    { id: '#1232', title: 'Feature request: Dark mode', status: 'Pending' as const, priority: 'Low' as const, time: '2h ago' },
    { id: '#1231', title: 'App crashes on startup', status: 'Resolved' as const, priority: 'High' as const, time: '3h ago' },
];

export default function TicketsPage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!token || !storedUser) {
            router.push('/login');
            return;
        }

        try {
            setUser(JSON.parse(storedUser));
        } catch {
            router.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await logout(token);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="relative">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <Header
                    title="All Tickets"
                    subtitle="Manage and track all your support tickets"
                    user={user}
                    onLogout={handleLogout}
                />

                <PageTransition>
                    <main className="flex-1 p-8">
                        {/* Tickets List */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">Ticket List</h3>
                                <div className="flex items-center gap-2">
                                    <button className="text-sm font-semibold text-[#14497F] hover:underline">Export</button>
                                    <button className="px-4 py-2 bg-[#14497F] text-white rounded-lg text-sm font-semibold hover:bg-[#103a66]">+ New Ticket</button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {tickets.map((ticket) => (
                                    <TicketRow
                                        key={ticket.id}
                                        id={ticket.id}
                                        title={ticket.title}
                                        status={ticket.status}
                                        priority={ticket.priority}
                                        time={ticket.time}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                </PageTransition>
            </div>
        </div>
    );
}
