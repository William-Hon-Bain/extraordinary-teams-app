'use client';

import dynamic from 'next/dynamic';

const RotatableCube = dynamic(() => import('./RotatableCube'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-gray-800 animate-pulse">Loading 3D Scene...</div>
});

export default function ClientRotatableCube() {
    return <RotatableCube />;
}
