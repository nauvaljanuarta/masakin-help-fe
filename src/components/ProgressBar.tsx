interface ProgressBarProps {
    label: string;
    value: number;
    color: 'primary' | 'secondary' | 'green' | 'danger';
}

const colorStyles = {
    primary: 'bg-[#14497F]',
    secondary: 'bg-[#FFCB05]',
    green: 'bg-green-500',
    danger: 'bg-[#E62B2B]',
};

export default function ProgressBar({ label, value, color }: ProgressBarProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <span className="text-sm font-bold text-gray-900">{value}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${colorStyles[color]}`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
}
