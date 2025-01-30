import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import CampingListPage from "./pages/CampingListPage/CampingListPage";
import CampingDetailPage from "./pages/CampingDetailPage/CampingDetailPage";
import SearchDataPage from "./pages/SearchDataPage/SearchDataPage";
import EventListPage from "./pages/EventListPage/EventListPage";
import BestCampListPage from "./pages/BestCampListPage/BestCampListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyPage from "./pages/MyPage/MyPage";
import MarketListPage from "./pages/CommunityPage/MarketListPage";
import MarketDetailPage from "./pages/CommunityPage/MarketDetailPage";
import MarketWritePage from "./pages/CommunityPage/MarketWritePage";
import CookListPage from "./pages/CommunityPage/CookListPage";
import CookDetailPage from "./pages/CommunityPage/CookDetailPage";
import CookWritePage from "./pages/CommunityPage/CookWritePage";
import RecommendListPage from "./pages/CommunityPage/RecommendListPage";
import RecommendDetailPage from "./pages/CommunityPage/RecommendDetailPage";
import RecommendWritePage from "./pages/CommunityPage/RecommendWritePage";
import SignUpPage from "./pages/JoinPage/SignUpPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/campings">
          <Route index element={<CampingListPage />} />
          <Route path=":contentId" element={<CampingDetailPage />} />
        </Route>
        <Route path="/search">
          <Route index element={<SearchDataPage />} />
        </Route>
        <Route path="/event">
          <Route index element={<EventListPage />} />
        </Route>
        <Route path="/login">
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/signup">
          <Route index element={<SignUpPage />} />
        </Route>
        <Route path="/bestCamp">
          <Route index element={<BestCampListPage />} />
        </Route>
        <Route path="/campingsdetail">
          <Route path=":contentId" element={<CampingDetailPage />} />
        </Route>
        <Route path="/mypage">
          <Route index element={<MyPage />} />
        </Route>
        <Route path="/admin">
          <Route index element={<AdminPage />} />
        </Route>
        <Route path="/">
          <Route path="market" element={<MarketListPage />} />
          <Route path="market/:id" element={<MarketDetailPage />} />
          <Route path="market/write" element={<MarketWritePage />} />
          <Route path="cook" element={<CookListPage />} />
          <Route path="cook/:id" element={<CookDetailPage />} />
          <Route path="cook/write" element={<CookWritePage />} />
          <Route path="recommend" element={<RecommendListPage />} />
          <Route path="recommend/:id" element={<RecommendDetailPage />} />
          <Route path="recommend/write" element={<RecommendWritePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
