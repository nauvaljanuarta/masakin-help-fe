import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    iconBgColor: string;
    badge: string;
    badgeColor: 'green' | 'red' | 'yellow';
    value: string;
    label: string;
}

const badgeStyles = {
    green: 'text-green-600 bg-green-100',
    red: 'text-[#E62B2B] bg-[#E62B2B]/10',
    yellow: 'text-[#997A03] bg-[#FFCB05]/20',
};

export default function StatCard({
    icon,
    iconBgColor,
    badge,
    badgeColor,
    value,
    label,
}: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBgColor}`}>
                    {icon}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeStyles[badgeColor]}`}>
                    {badge}
                </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm font-medium text-gray-500">{label}</p>
        </div>
    );
}
