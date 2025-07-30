import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    function goToHomePage() {
        navigate('/');
    }
    function goToCheckStatusPage() {
        navigate('/check-status');
    }
    function goToBookingPage() {
        navigate('/book');
    }
    return (
        <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            {/* Logo and Brand */}
            <div className="logo-section" style={{ cursor: "pointer" }} onClick={goToHomePage}>
              <div className="logo-container">
                <div className="logo-icon">
                  <span className="logo-text">H</span>
                </div>
                <span className="brand-name">Vil Hotel</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="nav-links-desktop">
              <div className="nav-links">
                <a href="#home" className="nav-link" onClick={goToHomePage}>Home</a>
                <a href="#about" className="nav-link" onClick={goToHomePage}>About</a>
                <a href="#rooms" className="nav-link" onClick={goToHomePage}>Rooms</a>
                <a href="#booknow" className="nav-link" onClick={goToBookingPage}>Book Now</a>
                <a href="#status" className="nav-link" onClick={goToCheckStatusPage}>Check Status</a>
                <a href="#contact" className="nav-link" onClick={goToHomePage}>Contact</a>
                <button className="signin-btn">Sign In</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="mobile-menu-btn">
              <button className="menu-toggle">
                <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;