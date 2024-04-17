import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import CampingListPage from "./pages/CampingListPage/CampingListPage"
import CampingDetailPage from './pages/CampingDetailPage/CampingDetailPage';
import SearchDataPage from './pages/SearchDataPage/SearchDataPage';
import EventList from './pages/EventList/EventList';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/campings">
          <Route index element={<CampingListPage />} />
          <Route path=":contentId" element={<CampingDetailPage />} />
        </Route>
        <Route path='/EventList'>
          <Route index element={<EventList />} />
        </Route>
        <Route path="/search">
          <Route index element={<SearchDataPage />} />
          <Route path=":contentId" element={<SearchDataPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
