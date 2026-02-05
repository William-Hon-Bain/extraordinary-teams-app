'use client';

import { useState } from 'react';
import { useOffice } from '../contexts/OfficeContext';

export default function SprintSubmissionModal() {
    const { isModalOpen, closeModal, selectedDepartment, incrementProgress, getCurrentOffice, offices, currentOfficeName } = useOffice();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successPercent, setSuccessPercent] = useState<number | null>(null);
    const [targetDonationOffice, setTargetDonationOffice] = useState<string>('');
    const [donatedOfficeName, setDonatedOfficeName] = useState<string>('');

    const currentOffice = getCurrentOffice();
    const targetGoal = currentOffice ? currentOffice.target : 10000;
    const isComplete = (currentOffice?.progress || 0) >= targetGoal;

    // Filter other offices for donation dropdown
    const otherOffices = offices.filter(o => o.name !== currentOfficeName);

    const handleClose = () => {
        setSuccessPercent(null);
        setIsSubmitting(false);
        setTargetDonationOffice('');
        setDonatedOfficeName('');
        closeModal();
    };

    if (!isModalOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const taskCount = parseInt(formData.get('taskCount') as string, 10) || 0;

        // Logic: Every task is 1% towards progress
        const pointsPerTask = targetGoal * 0.01;
        const totalPointsToAdd = taskCount * pointsPerTask;

        // Percentage added for display
        const addedPercent = taskCount; // Since 1 task = 1%

        // Determine destination
        const destination = isComplete && targetDonationOffice ? targetDonationOffice : currentOfficeName;
        setDonatedOfficeName(destination);

        // Simulate network delay using setTimeout for effect
        setTimeout(() => {
            incrementProgress(totalPointsToAdd, destination);
            setSuccessPercent(addedPercent);
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden transform transition-all">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#222]">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-6 bg-red-600 rounded-full" />
                            {selectedDepartment} Sprint Submission
                        </h3>
                        {isComplete && (
                            <span className="text-green-500 text-xs font-semibold ml-4 uppercase tracking-wider">
                                Goal Complete • Donation Mode
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Conditional Rendering: Success View vs Form */}
                {successPercent !== null ? (
                    <div className="p-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">Sprint Submitted!</h4>
                        <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                            Great work! You have added <span className="text-white font-bold text-lg">{successPercent}%</span> to <span className="text-red-500 font-semibold">{donatedOfficeName}</span>.
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {isComplete && (
                            <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-red-500 mb-2 uppercase tracking-wide">Donate Points To</label>
                                <select
                                    required
                                    value={targetDonationOffice}
                                    onChange={(e) => setTargetDonationOffice(e.target.value)}
                                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                                >
                                    <option value="" disabled>Select an office...</option>
                                    {otherOffices.map(office => (
                                        <option key={office.name} value={office.name}>{office.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Manager Name/Credentials</label>
                                <input
                                    required
                                    name="managerName"
                                    type="text"
                                    placeholder="e.g. John Doe / PMP"
                                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Case Code</label>
                                <input
                                    required
                                    name="caseCode"
                                    type="text"
                                    placeholder="e.g. CS-2024-X"
                                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Weekly Sprint</label>
                            <input
                                required
                                name="sprintTitle"
                                type="text"
                                placeholder="e.g. Q1 Optimization Sprint"
                                className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Number of Tasks in Sprint</label>
                            <input
                                required
                                name="taskCount"
                                type="number"
                                min="1"
                                placeholder="0"
                                className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Description <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                placeholder="Additional details..."
                                className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors resize-none"
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`
                px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]
                ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
              `}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Sprint'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
