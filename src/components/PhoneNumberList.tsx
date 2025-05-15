import type { PhoneNumber } from "@/types/types";
import ListEntryButton from "./ListEntryButton";

type Props = {
  phoneNumbers: PhoneNumber[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const PhoneNumberList = ({ phoneNumbers, selectedId, onSelect }: Props) => {
  return (
    <div>
      {phoneNumbers.map((number) => {
        return (
          <ListEntryButton
            key={number.id}
            icon={number.symbol ?? "📞"}
            title={number.name}
            subtitle={number.formattedNumber}
            selected={selectedId === number.id}
            onClick={() => onSelect(number.id)}
          />
        );
      })}
    </div>
  );
};

export default PhoneNumberList;
