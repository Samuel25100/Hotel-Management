import React, { useState } from 'react';
import './style/Sidebar.css';
import { Link } from 'react-router-dom';



const Sidebar: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);

  const toggleStaffDropdown = () => {
    setIsStaffOpen(!isStaffOpen);
  }

  const toggleBookingDropdown = () => {
    setIsBookingOpen(!isBookingOpen);
  };

  const toggleRoomDropdown = () => {
    setIsRoomOpen(!isRoomOpen);
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
            <li className="menu-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="menu-item">
              <div className="menu-item-main" onClick={toggleBookingDropdown}>
                Booking
                <span className={`dropdown-arrow ${isBookingOpen ? 'open' : ''}`}>
                    <img src="/src/assets/arrow-down.png" alt="▼"/>
                </span>
              </div>
              {isBookingOpen && (
                <ul className="submenu">
                  <li className="submenu-item">
                    <Link to="/add-booking">Add booking</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/edit-booking">Edit booking</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/view-bookings">View Bookings</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/booking-requests">Booking Requests</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="menu-item">
              Registration
            </li>
            <li className="menu-item">
              Check-in/out
            </li>
            <li className="menu-item" >
              <div className="menu-item-main" onClick={toggleRoomDropdown}>
                Rooms
                <span className={`dropdown-arrow ${isRoomOpen ? 'open' : ''}`}>
                    <img src="/src/assets/arrow-down.png" alt="▼"/>
                </span>
              </div>
                {isRoomOpen && (
                  <ul className="submenu">
                    <li className="submenu-item">
                      <Link to="/add-room">Add Room</Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/edit-room">Edit Room</Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/view-rooms">View Rooms</Link>
                    </li>
                  </ul>
                )}
            </li>
            <li className="menu-item" >
              Guests
            </li>
            <li className="menu-item" >
                <div className="menu-item-main" onClick={toggleStaffDropdown}>
                    Staff
                <span className={`dropdown-arrow ${isStaffOpen ? 'open' : ''}`}>
                    <img src="/src/assets/arrow-down.png" alt="▼"/>
                </span>
              </div>
              {isStaffOpen && (
                <ul className="submenu">
                  <li className="submenu-item">
                    <Link to="/add-staff">Add Staff</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/edit-staff">Edit Staff</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/view-staff">View Staff</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Finance Section */}
        <div className="menu-section">
          <h3 className="section-title">Finance</h3>
          <ul className="menu-list">
            <li className="menu-item" >
              Invoice
            </li>
            <li className="menu-item" >
              Bill info
            </li>
            <li className="menu-item" >
              Guest info
            </li>
            <li className="menu-item" >
              Reports
            </li>
          </ul>
        </div>

        {/* System Section */}
        <div className="menu-section">
          <h3 className="section-title">System</h3>
          <ul className="menu-list">
            <li className="menu-item logout">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;