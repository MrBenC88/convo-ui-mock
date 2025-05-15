import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ParticipantInfoProps, TopBarProps } from "@/types/types";
import { findParticipantData } from "@/utils/findParticipantData";

const styles = {
  container: "flex items-center gap-3",
  symbol: "text-xl",
  display: "text-sm font-medium text-white",
  formattedNumber: "text-xs text-zinc-400",
  topBarContainer:
    "sticky top-0  border-b border-zinc-800 px-4 py-3 flex items-center gap-3",
};

const TopBar = ({ participants, onBack }: TopBarProps) => {
  return (
    <div className={styles.topBarContainer}>
      <Button size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <ParticipantInfo participant={participants[0]} />
    </div>
  );
};

const ParticipantInfo = ({ participant }: ParticipantInfoProps) => {
  const data = findParticipantData(participant);

  return (
    <div className={styles.container}>
      <div className={styles.symbol}>{data.symbol}</div>
      <div className="flex flex-col">
        <div className={styles.display}>{data.display}</div>
        <div className={styles.formattedNumber}>{data.formattedNumber}</div>
      </div>
    </div>
  );
};

export default TopBar;
