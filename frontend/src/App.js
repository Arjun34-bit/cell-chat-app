import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminUserPage from "./Pages/AdminUserPage";
import { ChatState } from "./Context/ChatProvider";
const HomePage = lazy(() => import("./Pages/HomePage"));
const ChatPage = lazy(() => import("./Pages/ChatPage"));
const AdminPage = lazy(() => import("./Pages/AdminPage"));

function App() {
  const { loggedIn } = ChatState();
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="center-loading">
            <center>
              <span className="span-tag">Cell is Loading Your Content....</span>
            </center>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route exact path="/chats" element={<ChatPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
