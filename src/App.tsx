import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
