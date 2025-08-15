import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './style/index.css';
import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
import BookingRequestPage from './pages/BookingReq.tsx';
import AddBooking from './pages/AddBooking.tsx';
import ViewRoom from './pages/ViewRoom.tsx';
import AddRoom from './pages/AddRoom.tsx';
import CheckInCheckOut from './pages/CheckIn_Out.tsx';
import GuestManagement from './pages/GuestMgt.tsx';
import ViewStaff from './pages/ViewStaff.tsx';
import AddStaff from './pages/AddStaff.tsx';
import LoginPage from './pages/LoginPage.tsx';

// Ensure the root element exists before rendering
if (!document.getElementById('root')) {
  throw new Error('Root element not found');
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="booking-requests" element={<BookingRequestPage />} />
          <Route path="add-booking" element={<AddBooking />} />
          <Route path="view-rooms" element={<ViewRoom />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="check-in-out" element={<CheckInCheckOut />} />
          <Route path="guest-management" element={<GuestManagement />} />
          <Route path="view-staff" element={<ViewStaff />} />
          <Route path="add-staff" element={<AddStaff />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);