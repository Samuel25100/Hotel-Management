import React, { useState } from 'react';
import './style/BookingPage.css';
import Navbar from './navBar';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkinDate: string;
  checkoutDate: string;
  roomType: string;
  guestNumber: string;
  specialRequest: string;
}

const BookingPage: React.FC = () => {

   
    const [formData, setFormData] = useState<BookingFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkinDate: '',
        checkoutDate: '',
        roomType: '',
        guestNumber: '',
        specialRequest: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const isFormValid = () => {
        return Object.entries(formData).every(([key, value]) => {
        if (key === 'specialRequest') return true; // Special request is optional
        return value.trim() !== '';
        });
    };

    const handleSubmit = () => {
        if (isFormValid()) {
        alert('Booking submitted successfully!');
        console.log('Booking data:', formData);
        } else {
        alert('Please fill in all required fields.');
        }
    };

  return (
    <div className="booking-app-container">
      {/* Navigation Bar - Same as landing page */}
      
        <Navbar />

        {/* Hero Section with Background Image */}

      {/* Main Booking Content */}
      <div className="booking-main">
        <div className="booking-container">
          <h1 className="booking-page-title">Make Your Reservation</h1>
          
          <div className="booking-content">
            {/* Left Box - Booking Form */}
            <div className="booking-form-container">
              <h2 className="form-title">Booking Details</h2>
              <div className="booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
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
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkinDate">Check-in Date *</label>
                    <input
                      type="date"
                      id="checkinDate"
                      name="checkinDate"
                      value={formData.checkinDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkoutDate">Check-out Date *</label>
                    <input
                      type="date"
                      id="checkoutDate"
                      name="checkoutDate"
                      value={formData.checkoutDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="roomType">Room Type *</label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Room Type</option>
                      <option value="standard">Standard Room</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="suite">Suite</option>
                      <option value="presidential">Presidential Suite</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="guestNumber">Number of Guests *</label>
                    <select
                      id="guestNumber"
                      name="guestNumber"
                      value={formData.guestNumber}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequest">Special Requests</label>
                  <textarea
                    id="specialRequest"
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </div>
            </div>

            {/* Right Box - Booking Information */}
            <div className="booking-info-container">
              <h2 className="info-title">Booking Information</h2>
              
              <div className="info-section payment-info">
                <h3 className="section-title">Payment Information</h3>
                <p>• Payment is required at check-in</p>
                <p>• We accept all major credit cards</p>
                <p>• Cash payments are also welcome</p>
                <p>• Room charges will be processed upon arrival</p>
              </div>

              <div className="info-section reservation-policy">
                <h3 className="section-title">Reservation Policy</h3>
                <p>• Reservations must be made 24 hours in advance</p>
                <p>• Valid ID required at check-in</p>
                <p>• Check-in time: 3:00 PM</p>
                <p>• Check-out time: 11:00 AM</p>
                <p>• Maximum occupancy varies by room type</p>
              </div>

              <div className="info-section cancellation-policy">
                <h3 className="section-title">Cancellation Policy</h3>
                <p>• Free cancellation up to 24 hours before arrival</p>
                <p>• Cancellations within 24 hours: 50% charge</p>
                <p>• No-show reservations: full charge applies</p>
                <p>• Special events may have different policies</p>
              </div>

              <button 
                type="button"
                className={`book-now-button ${isFormValid() ? 'enabled' : 'disabled'}`}
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;