import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
    >
      <ArrowLeft size={20} />
      Back
    </button>
  );
}
