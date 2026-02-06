export default function LoadingSpinner() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#14497F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-[#14497F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-[#14497F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
}
