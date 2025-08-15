import React, { useState } from 'react';
import '/src/style/Sidebar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);

  const toggleStaffDropdown = () => {
    setIsStaffOpen(!isStaffOpen);
    setIsBookingOpen(false);
    setIsRoomOpen(false);
  }

  const toggleBookingDropdown = () => {
    setIsBookingOpen(!isBookingOpen);
    setIsStaffOpen(false);
    setIsRoomOpen(false);
  };

  const toggleRoomDropdown = () => {
    setIsRoomOpen(!isRoomOpen);
    setIsStaffOpen(false);
    setIsBookingOpen(false);
  };

  return (
    <div className="sidebar">
      {/* Header Section */}
      <div className="sidebar-header" onClick={() => navigate('/')}>
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
                    <Link to="/booking-requests">Booking Requests</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="menu-item">
              Registration
            </li>
            <li className="menu-item">
              <Link to="/check-in-out">Check-in/out</Link>
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
                      <Link to="/view-rooms">View Rooms</Link>
                    </li>
                  </ul>
                )}
            </li>
            <li className="menu-item" >
              <Link to="/guest-management">Guests</Link>
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
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;