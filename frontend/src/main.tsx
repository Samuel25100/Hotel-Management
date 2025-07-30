import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingPage from './bookingPage.tsx';
import CheckStatusPage from './checkStatusPage.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/check-status" element={<CheckStatusPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
