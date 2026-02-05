import Link from 'next/link';
import ClientRotatableCube from '@/components/ClientRotatableCube';
import ProgressBar from '@/components/ProgressBar';
import DepartmentsDropdown from '@/components/DepartmentsDropdown';
import SprintSubmissionModal from '@/components/SprintSubmissionModal';
import { OfficeProvider } from '@/contexts/OfficeContext';

interface OfficePageProps {
  params: Promise<{
    location: string;
  }>;
}

export default async function OfficePage({ params }: OfficePageProps) {
  const { location } = await params;
  const locationName = decodeURIComponent(location);

  return (
    <OfficeProvider initialOfficeName={locationName}>
      <div className="relative h-screen bg-[#0B0B0B] flex flex-col overflow-hidden">
        {/* Top 10% - Office Title & Dropdown */}
        <div className="h-[10vh] flex items-center justify-center border-b border-white/5 bg-[#0B0B0B] z-10 relative px-8">
          {/* Back Button */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium hidden sm:inline">Back</span>
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight">
            <span className="drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              {locationName} Office
            </span>
          </h1>

          {/* Dropdown positioned absolutely to the right */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <DepartmentsDropdown />
          </div>
        </div>

        {/* Remaining Height - Split View (3D Model & Progress) */}
        <div className="flex-1 flex w-full min-h-0">
          {/* Left Half - Progress Bar (No Background) */}
          <div className="w-1/2 flex items-center justify-center relative">
            <ProgressBar />
          </div>

          {/* Right Half - 3D Cube */}
          <div className="w-1/2 flex items-center justify-center bg-gradient-to-l from-[#0B0B0B] to-[#121212]">
            <ClientRotatableCube />
          </div>
        </div>

        {/* Modals */}
        <SprintSubmissionModal />
      </div>
    </OfficeProvider>
  );
}
