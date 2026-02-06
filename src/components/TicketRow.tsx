interface TicketRowProps {
    id: string;
    title: string;
    status: 'Open' | 'In Progress' | 'Pending' | 'Resolved';
    priority: 'High' | 'Medium' | 'Low';
    time: string;
    onClick?: () => void;
}

const statusStyles = {
    'Open': 'bg-[#FFCB05]/20 text-[#997A03]',
    'In Progress': 'bg-[#14497F]/10 text-[#14497F]',
    'Pending': 'bg-gray-100 text-gray-600',
    'Resolved': 'bg-green-100 text-green-700',
};

const priorityStyles = {
    'High': 'bg-[#E62B2B]/10 text-[#E62B2B]',
    'Medium': 'bg-[#FFCB05]/20 text-[#997A03]',
    'Low': 'bg-gray-100 text-gray-600',
};

export default function TicketRow({ id, title, status, priority, time, onClick }: TicketRowProps) {
    return (
        <div
            className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition cursor-pointer"
            onClick={onClick}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400 font-medium">{id}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[status]}`}>
                        {status}
                    </span>
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
            </div>
            <div className="text-right">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${priorityStyles[priority]}`}>
                    {priority}
                </span>
                <p className="text-xs text-gray-400 mt-1">{time}</p>
            </div>
        </div>
    );
}
