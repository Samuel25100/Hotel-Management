import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './style/index.css';
import App from './App.tsx';
import Dashboard from './Dashboard';
import BookingRequestPage from './BookingReq';
import AddBooking from './AddBooking.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="booking-requests" element={<BookingRequestPage />} />
          <Route path="add-booking" element={<AddBooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);