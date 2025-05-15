import { usePhoneNumbers } from "@/hooks/usePhoneNumbers";
import { useEffect } from "react";
import PhoneNumberList from "./PhoneNumberList";
import SidebarOptions from "./SidebarOptions";
import LoadingSkeleton from "./LoadingSkeleton";

type Props = {
  onSelect: (id: string) => void;
  selectedId: string | null;
};

const styles = {
  container:
    "w-full md:w-64 border-r border-zinc-800 overflow-y-auto pt-5 px-1 bg-zinc-950 text-white",
  header: "font-bold mb-4 pl-2",
  error: "p-3 text-red-500",
  empty: "p-3 text-zinc-400",
};

const Sidebar = ({ onSelect, selectedId }: Props) => {
  const { data, isLoading, isError } = usePhoneNumbers();

  useEffect(() => {
    if (data) {
      console.log("✅ Loaded inboxes:", data);
    }
  }, [data]);

  const renderError = () => (
    <div className={styles.error}>Failed to load phone numbers</div>
  );
  const renderEmptyState = () => (
    <div className={styles.empty}>No inboxes found</div>
  );

  const renderInboxes = () => (
    <PhoneNumberList
      phoneNumbers={data}
      onSelect={onSelect}
      selectedId={selectedId}
    />
  );

  const renderContent = () => {
    if (isLoading) return <LoadingSkeleton />;
    if (isError) return renderError();
    if (data?.length > 0) return renderInboxes();
    return renderEmptyState();
  };

  return (
    <aside className={styles.container}>
      <SidebarOptions />
      <h2 className={styles.header}>Inboxes</h2>
      {renderContent()}
    </aside>
  );
};

export default Sidebar;
