import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminUserPage from "./Pages/AdminUserPage";
const HomePage = lazy(() => import("./Pages/HomePage"));
const ChatPage = lazy(() => import("./Pages/ChatPage"));
const AdminPage = lazy(() => import("./Pages/AdminPage"));

function App() {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/admin/:adminId" element={<AdminUserPage />} />
          <Route exact path="/chats" element={<ChatPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
