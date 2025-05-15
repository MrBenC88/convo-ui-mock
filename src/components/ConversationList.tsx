import { testContacts } from "@/utils/testContacts";
import ListEntryButton from "./ListEntryButton";

const styles = {
  header: "font-bold mb-4  mt-3 pl-2",
};

type Props = {
  onSelectConversation: (id: string) => void;
  selectedConversationId: string | null;
};

const ConversationList = ({
  onSelectConversation,
  selectedConversationId,
}: Props) => {
  return (
    <div className="p-2 space-y-1">
      <h2 className={styles.header}>Conversations</h2>
      {testContacts.map((contact) => (
        <ListEntryButton
          key={contact.number}
          icon={contact.symbol}
          title={contact.display}
          subtitle={contact.formattedNumber}
          selected={selectedConversationId === contact.number}
          onClick={() => onSelectConversation(contact.number)}
        />
      ))}
    </div>
  );
};

export default ConversationList;
