import React, { useState } from 'react';
import './style/checkStatusPage.css';
import Navbar from './navBar';

interface Booking {
  id: string;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

const CheckStatusPage: React.FC = () => {


  const [formData, setFormData] = useState({
    phoneNumber: '',
    lastName: ''
  });
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock booking data for demonstration
  const mockBookings: Booking[] = [
    {
      id: '1',
      guestName: 'John Smith',
      roomType: 'Deluxe Room',
      checkIn: '2025-08-15',
      checkOut: '2025-08-18',
      status: 'Confirmed'
    },
    {
      id: '2',
      guestName: 'John Smith',
      roomType: 'Standard Room',
      checkIn: '2025-09-10',
      checkOut: '2025-09-12',
      status: 'Pending'
    },
    {
      id: '3',
      guestName: 'Jane Smith',
      roomType: 'Suite',
      checkIn: '2025-07-20',
      checkOut: '2025-07-25',
      status: 'Completed'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return formData.phoneNumber.trim() !== '' && formData.lastName.trim() !== '';
  };

  const handleCheckStatus = () => {
    if (!isFormValid()) {
      alert('Please fill in both phone number and last name.');
      return;
    }

    setIsLoading(true);
    setHasSearched(false);

    // Simulate API call delay
    setTimeout(() => {
      // Filter bookings based on last name (case insensitive)
      const foundBookings = mockBookings.filter(booking => 
        booking.guestName.toLowerCase().includes(formData.lastName.toLowerCase())
      );
      
      setBookings(foundBookings);
      setHasSearched(true);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="status-app-container">
      {/* Navigation Bar - Same as other pages */}
      <Navbar />
    
        {/* Hero Section with Background Image */}

      {/* Main Status Check Content */}
      <div className="status-main">
        <div className="status-container">
          <h1 className="status-page-title">Check Hotel Reservation Status</h1>
          
          <div className="status-form-container">
            <div className="search-section">
              <h2 className="search-title">Enter Your Information</h2>
              
              <div className="search-form">
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <button 
                  className={`check-status-btn ${isFormValid() ? 'enabled' : 'disabled'}`}
                  onClick={handleCheckStatus}
                  disabled={!isFormValid() || isLoading}
                >
                  {isLoading ? 'Checking...' : 'Check Status'}
                </button>
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="booking-details-section">
              <h2 className="details-title">Booking Details</h2>
              
              <div className="booking-results">
                {isLoading && (
                  <div className="loading-message">
                    <div className="loading-spinner"></div>
                    <p>Searching for your reservations...</p>
                  </div>
                )}

                {hasSearched && !isLoading && (
                  <>
                    <div className="results-summary">
                      <p>Found <strong>{bookings.length}</strong> booking{bookings.length !== 1 ? 's' : ''}</p>
                    </div>

                    {bookings.length === 0 ? (
                      <div className="no-results">
                        <p>No bookings found with the provided information.</p>
                        <p>Please check your phone number and last name and try again.</p>
                      </div>
                    ) : (
                      <div className="bookings-list">
                        {bookings.map((booking, index) => (
                          <div key={booking.id} className="booking-item">
                            <div className="booking-table">
                              <div className="table-header">
                                <div className="header-cell">#</div>
                                <div className="header-cell">Guest Name</div>
                                <div className="header-cell">Room Type</div>
                                <div className="header-cell">Check In</div>
                                <div className="header-cell">Check Out</div>
                                <div className="header-cell">Status</div>
                              </div>
                              <div className="table-row">
                                <div className="table-cell">{index + 1}</div>
                                <div className="table-cell">{booking.guestName}</div>
                                <div className="table-cell">{booking.roomType}</div>
                                <div className="table-cell">{formatDate(booking.checkIn)}</div>
                                <div className="table-cell">{formatDate(booking.checkOut)}</div>
                                <div className="table-cell">
                                  <span className={`status-badge ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {!hasSearched && !isLoading && (
                  <div className="no-search">
                    <p>Enter your phone number and last name above to check your reservation status.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckStatusPage;