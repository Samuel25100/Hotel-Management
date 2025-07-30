import React from 'react';
import './style/HotelBooking.css';
import Navbar from './navBar';


const HotelBookingPage: React.FC = () => {

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section with Background Image */}
      <div className="hero-section">
        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-container">
            <div className="hero-text-container">
              <h1 className="hero-title">We serve experience</h1>
              <button className="book-now-btn">Book Now</button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Additional Sections */}
      <section id="about" className="section-white">
        <div className="section-container">
          <div className="section-content">
            <h2 className="section-title">About Our Hotel</h2>
            <p className="section-text">
              Experience luxury and comfort at its finest. Our hotel offers world-class amenities, 
              exceptional service, and unforgettable experiences in the heart of the city.
            </p>
          </div>
        </div>
      </section>

      <section id="rooms" className="section-gray">
        <div className="section-container">
          <div className="section-content">
            <h2 className="section-title">Our Rooms</h2>
            <p className="section-text">
              Choose from our selection of elegantly designed rooms and suites, 
              each offering modern amenities and stunning views.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="section-white">
        <div className="section-container">
          <div className="section-content">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-text">
              Get in touch with our friendly staff for any inquiries or special requests. 
              We're here to make your stay perfect.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelBookingPage;