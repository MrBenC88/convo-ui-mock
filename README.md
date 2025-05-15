# Conversation UI - Mock (Frontend Messaging Demo)

A responsive, full-featured chat UI simulating a real messaging experience with mocked API data and a lightweight Express proxy.

> ⚠️ This is a standalone demo project using mocked API data. All interactions are simulated for frontend showcase purposes.

## Screenshots

<details>

<summary>Click to view screenshots</summary>

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)

</details>

## Key Features

- Bi-directional chat: send and receive text messages
- Optimistic UI: outgoing messages render instantly
- Polling (5s) for incoming messages
- Pagination on scroll-up to load message history
- Scroll preservation when fetching older messages
- Timestamped bubbles with sender/receiver context
- Basic input validation and error handling
- Responsive layout with three-panel routing structure
- Lightweight state handled with composable hooks
- Fully mocked backend and message data

## Quick Start / Setup Instructions

This project runs entirely in mock mode — no API key is needed.

1. Clone the repository.
2. (Optional) Add a personal test contact in `src/utils/testContacts.ts` for local testing.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the Vite frontend:
   ```
   npm run dev
   ```
5. (Optional) Start the mocked Express backend: (Note: Backend server is stubbed and mocked. No api key required.)
   ```
   cd server
   npm install
   npm run server
   ```
6. To run tests:
   ```
   npm run test
   ```
7. To run tests in watch mode:
   ```
   npm run test:watch
   ```

## Architecture

The application is structured into two main parts: the frontend and the backend.

### Frontend

Stack: React, Vite, TypeScript, Tailwind CSS, Shadcn UI, React Router

We follow separation of concerns:

- **Hooks**: All data fetching logic (fetching, messages, polling, sending) is abstracted into custom hooks (`useMessages`, `useSendMessage`, `usePhoneNumbers`) for testability and reusability.

- **Components**: UI is split into clean, focused components (`TopBar`, `MessageList`, `MessageInput`, etc.)

- **Utils**: Shared logic for util helpers.

- **Routes**:

  - `/inbox`: Displays a list of available phone numbers.
  - `/inbox/:phoneNumberId`: Lists conversations associated with a selected number.
  - `/inbox/:phoneNumberId/conversation/:conversationId`: Chat interface to send and receive messages.

### Backend (Mocked)

Stack: Node.js + Express.js + TypeScript

A lightweight proxy that:

- Exposes RESTful routes.
- Injects the third-party messaging API key in headers.
- Handles GET /phone-numbers, GET /messages, and POST /messages.
- Prevents frontend CORS and security issues

Note:

- All routes currently return mocked data to simulate interaction
- Real API logic is commented out and not active

#### Data Flow:

1. User selects a conversation (between two known numbers).
2. Messages are fetched via paginated `/api/messages` with `nextPageToken`.
3. On scroll-up, more messages load with scroll preserved.
4. Outgoing messages are sent optimistically and updated based on response.
5. New messages are polled periodically and deduplicated before merging.

## Trade offs

- **Polling instead of WebSockets**: Went with polling (5s) to reduce complexity. It avoids socket setup and lifecycle bugs while being reliable for messaging. In production, we’d likely use sockets or SSE to minimize latency and reduce backend polling load.
- **Optimistic UI**: Outbound messages render instantly for smooth UX. Comes with trade-offs like local deduplication and potential delivery mismatch, but greatly improves responsiveness.
- **Pagination vs. Full Load**: Scroll up pagination with `nextPageToken` avoids overfetching. Virtualization wasn’t needed for this volume and would cause extra overhead/complexity.
- **Manual Scroll Preservation**: Preserved scroll position after paginated loads by calculating offset differences. Keeps user position stable while loading older messages without visual jank.
- **No Scroll-to-Bottom on Polling**: New incoming messages don’t scroll-to-bottom. Prevents interrupting users reviewing previous content. Only auto-scrolls on initial load.
- **Minimal State Management**: No Redux or global stores. Scoped state and composable hooks (useMessages, useSendMessage) were sufficient and low overhead.

### Assumptions

- **Hardcoded Conversations**: Third-party messaging API conversations endpoint doesn’t support filtering by external number. To simulate a real conversation, hardcoded known test participants and skipped /conversations.
- **No Auth Layer**: Used static API key injected via proxy. A real app would require scoped keys, token auth, and CORS hardening.
- **Polling every 5 seconds**: 5s interval assumed to be acceptable. In production, adaptive polling or socket fallback strategies could be introduced.
- **No Offline Support or Queue for Failures**: For scope reasons, features like local draft caching or offline send queues are out of scope. In production, we would explore the use of DeadLetter Queues or local storage for offline support. We would also consider the use of retry / exponential backoff for failed messages.

### Backend Server Routes

| HTTP Verb | Endpoint             | Function          | Description                                                               |
| --------- | -------------------- | ----------------- | ------------------------------------------------------------------------- |
| `GET`     | `/api/phone-numbers` | `getPhoneNumbers` | Lists available phone numbers from the messaging service                  |
| `GET`     | `/api/messages`      | `getMessages`     | Retrieves messages for a conversation between the number and participants |
| `POST`    | `/api/messages`      | `sendMessage`     | Sends a text message to a recipient                                       |

🛠️ Built for demonstration purposes. No real data or credentials required.  
Feel free to fork, adapt, or extend for your own projects.
