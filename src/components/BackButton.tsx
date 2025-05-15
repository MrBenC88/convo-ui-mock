import { ArrowLeft } from "lucide-react";

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <div className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-700 md:hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-4 py-3 text-white"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  </div>
);

export default BackButton;
