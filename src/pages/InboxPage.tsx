import { useParams, useNavigate } from "react-router-dom";
import { useIsDesktop } from "@/hooks/useIsDesktop";

import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import ConversationList from "@/components/ConversationList";
import BackButton from "@/components/BackButton";
import Conversation from "@/components/Conversation";

const styles = {
  container: "flex flex-col md:flex-row h-full w-full",
  conversationPanel:
    "w-full md:w-70 border-b md:border-r border-zinc-800 overflow-y-auto",
  chatPanel: "flex-1 overflow-y-auto",
  emptyState: "px-4 py-6 text-zinc-400",
};

const InboxPage = () => {
  const { phoneNumberId, conversationId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const handlePhoneNumberSelect = (id: string) => {
    navigate(`/inbox/${id}`);
  };

  const handleConversationSelect = (id: string) => {
    if (!phoneNumberId) return;
    navigate(`/inbox/${phoneNumberId}/conversation/${id}`);
  };

  const showSidebar = isDesktop || !phoneNumberId;
  const showConversationList = isDesktop || (phoneNumberId && !conversationId);
  const showChat = isDesktop || !!conversationId;

  const renderBackButton = (to: string) =>
    !isDesktop ? <BackButton onClick={() => navigate(to)} /> : null;

  const renderConversationPanel = () => (
    <div className={styles.conversationPanel}>
      {renderBackButton("/inbox")}
      {phoneNumberId ? (
        <ConversationList
          onSelectConversation={handleConversationSelect}
          selectedConversationId={conversationId ?? null}
        />
      ) : (
        <div className={styles.emptyState}>Select a phone number to begin</div>
      )}
    </div>
  );

  const renderChatPanel = () =>
    phoneNumberId && conversationId ? (
      <div className={styles.chatPanel}>
        <Conversation
          participants={[conversationId]}
          phoneNumberId={phoneNumberId}
          onBack={() => navigate(`/inbox/${phoneNumberId}`)}
        />
      </div>
    ) : (
      <div className={styles.emptyState}>
        Select a phone number and conversation to begin
      </div>
    );

  return (
    <Layout
      sidebar={
        showSidebar ? (
          <Sidebar
            onSelect={handlePhoneNumberSelect}
            selectedId={phoneNumberId ?? null}
          />
        ) : null
      }
    >
      <div className={styles.container}>
        {showConversationList && renderConversationPanel()}
        {showChat && renderChatPanel()}
      </div>
    </Layout>
  );
};

export default InboxPage;
