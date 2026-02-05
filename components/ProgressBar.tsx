'use client';

import { useOffice } from '../contexts/OfficeContext';

export default function ProgressBar() {
    const { getCurrentOffice, offices, currentOfficeName } = useOffice();
    const currentOffice = getCurrentOffice();

    if (!currentOffice) return null;

    const { progress: current, target } = currentOffice;
    const percentage = Math.min(100, Math.max(0, (current / target) * 100));
    const isComplete = percentage >= 100;

    // Filter other offices for display
    const otherOffices = offices.filter(o => o.name !== currentOfficeName);

    if (isComplete) {
        return (
            <div className="w-full max-w-xl p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Success Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-green-500 mb-2">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xl font-bold tracking-wider uppercase">Goal Hit!</span>
                    </div>
                    <h3 className="text-4xl font-bold text-white leading-tight">
                        Ready to Print <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                            3D Model
                        </span>
                    </h3>
                    <p className="text-gray-400 mt-2">
                        This office has completed its goals. Future sprints can now be donated to other offices.
                    </p>
                </div>

                {/* Other Offices Progress */}
                <div className="mt-6 flex flex-col gap-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Other Offices Progress</h4>
                    <div className="space-y-3">
                        {otherOffices.map((office) => {
                            const offPct = Math.min(100, (office.progress / office.target) * 100);
                            return (
                                <div key={office.name} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-sm text-gray-300">
                                        <span>{office.name}</span>
                                        <span>{offPct.toFixed(0)}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gray-600 rounded-full transition-all duration-1000"
                                            style={{ width: `${offPct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl p-8 flex flex-col gap-6">
            {/* Header */}
            <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-red-500 p-2 bg-red-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                </span>
                EOY 3D Model Goal
            </h3>

            {/* Stats */}
            <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-end gap-2">
                    <span className="text-6xl font-black text-white tracking-tighter">{current.toLocaleString()}</span>
                    <span className="text-xl text-gray-500 font-medium mb-2">/ {target.toLocaleString()} points</span>
                </div>
                <div className="text-lg font-semibold text-red-500 tracking-wide uppercase">
                    {percentage.toFixed(0)}% Completed
                </div>
            </div>

            {/* Bar Track */}
            <div className="h-6 bg-gray-900 rounded-full overflow-hidden relative shadow-inner border border-gray-800">
                {/* Progress Fill */}
                <div
                    className="h-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-full relative transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                    style={{ width: `${percentage}%` }}
                >

                </div>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed max-w-sm">
                Reach 100% to unlock the commemorative 3D printed model for this office!
            </p>
        </div>
    );
}
