'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import TicketRow from '@/components/dashboard/TicketRow';
import ProgressBar from '@/components/dashboard/ProgressBar';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PageTransition from '@/components/common/PageTransition';
import { logout } from '@/lib/api/auth';
import { Package, Clock, CheckCircle, Zap } from '@deemlol/next-icons';

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

export default function Dashboard() {
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
                    title="Dashboard"
                    subtitle="Welcome back, here's what's happening"
                    user={user}
                    onLogout={handleLogout}
                />

                <PageTransition>
                    <main className="flex-1 p-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                icon={<Package size={28} color="#14497F" />}
                                iconBgColor="bg-[#14497F]/10"
                                badge="+12%"
                                badgeColor="green"
                                value="1,284"
                                label="Total Tickets"
                            />
                            <StatCard
                                icon={<Clock size={28} color="#997A03" />}
                                iconBgColor="bg-[#FFCB05]/20"
                                badge="+5"
                                badgeColor="red"
                                value="23"
                                label="Open Tickets"
                            />
                            <StatCard
                                icon={<CheckCircle size={28} color="#16a34a" />}
                                iconBgColor="bg-green-100"
                                badge="Today"
                                badgeColor="green"
                                value="47"
                                label="Resolved Today"
                            />
                            <StatCard
                                icon={<Zap size={28} color="#14497F" />}
                                iconBgColor="bg-[#14497F]/10"
                                badge="-8min"
                                badgeColor="green"
                                value="2.4h"
                                label="Avg Response"
                            />
                        </div>

                        {/* Recent Activity Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Tickets */}
                            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900">Recent Tickets</h3>
                                    <button className="text-sm font-semibold text-[#14497F] hover:underline">View all</button>
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

                            {/* Quick Stats */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-6">Quick Stats</h3>
                                <div className="space-y-6">
                                    <ProgressBar label="Resolution Rate" value={94} color="green" />
                                    <ProgressBar label="Customer Satisfaction" value={87} color="primary" />
                                    <ProgressBar label="SLA Compliance" value={98} color="secondary" />
                                </div>
                            </div>
                        </div>
                    </main>
                </PageTransition>
            </div>
        </div>
    );
}
