import React from 'react';
import './style/Sidebar.css';

interface SidebarProps {
  onMenuClick?: (menuItem: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const handleClick = (menuItem: string) => {
    if (onMenuClick) {
      onMenuClick(menuItem);
    }
  };

  return (
    <div className="sidebar">
      {/* Header Section */}
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="hotel-logo"><img src="/src/assets/h_large.png" alt="Hotel Logo" /></div>
          <h2 className="hotel-name">Vil Hotel</h2>
        </div>
        <p className="system-title">Management System</p>
      </div>

      {/* Menu Sections */}
      <div className="menu-sections">
        {/* Main Section */}
        <div className="menu-section">
          <h3 className="section-title">Main</h3>
          <ul className="menu-list">
            <li className="menu-item" onClick={() => handleClick('dashboard')}>
              Dashboard
            </li>
            <li className="menu-item" onClick={() => handleClick('booking-requests')}>
              Booking Requests
            </li>
            <li className="menu-item" onClick={() => handleClick('registration')}>
              Registration
            </li>
            <li className="menu-item" onClick={() => handleClick('check-in')}>
              Check-in
            </li>
            <li className="menu-item" onClick={() => handleClick('check-out')}>
              Check-out
            </li>
            <li className="menu-item" onClick={() => handleClick('rooms')}>
              Rooms
            </li>
            <li className="menu-item" onClick={() => handleClick('guests')}>
              Guests
            </li>
          </ul>
        </div>

        {/* Finance Section */}
        <div className="menu-section">
          <h3 className="section-title">Finance</h3>
          <ul className="menu-list">
            <li className="menu-item" onClick={() => handleClick('invoice')}>
              Invoice
            </li>
            <li className="menu-item" onClick={() => handleClick('bill-info')}>
              Bill info
            </li>
            <li className="menu-item" onClick={() => handleClick('guest-info')}>
              Guest info
            </li>
            <li className="menu-item" onClick={() => handleClick('reports')}>
              Reports
            </li>
          </ul>
        </div>

        {/* System Section */}
        <div className="menu-section">
          <h3 className="section-title">System</h3>
          <ul className="menu-list">
            <li className="menu-item logout" onClick={() => handleClick('logout')}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;