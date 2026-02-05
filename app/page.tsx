import Header from '@/components/Header';
import OfficeCarousel from '@/components/OfficeCarousel';

export default function Home() {
  return (
    <div className="relative h-screen sm:h-screen w-full bg-[#0B0B0B] overflow-hidden flex flex-col supports-[height:100dvh]:h-[100dvh]">
      <Header />
      <OfficeCarousel />
    </div>
  );
}
