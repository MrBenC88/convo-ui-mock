import { Routes, Route, Navigate } from "react-router-dom";
import InboxPage from "@/pages/InboxPage";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inbox" />} />
      <Route path="/inbox" element={<InboxPage />} />
      <Route path="/inbox/:phoneNumberId" element={<InboxPage />} />
      <Route
        path="/inbox/:phoneNumberId/conversation/:conversationId"
        element={<InboxPage />}
      />
    </Routes>
  );
};

export default App;
