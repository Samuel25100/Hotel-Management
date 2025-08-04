import React, { useState, useMemo } from 'react';
import './style/GuestMgt.css';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'checked-in' | 'checked-out' | 'reserved';
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'partial';
  guestType: 'regular' | 'vip' | 'corporate';
  nationality: string;
  idNumber: string;
}

const GuestManagement: React.FC = () => {
  // Sample guest data
  const [guests] = useState<Guest[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1234567890',
      roomNumber: '101',
      checkInDate: '15/08/2025',
      checkOutDate: '18/08/2025',
      status: 'checked-in',
      totalAmount: 450,
      paymentStatus: 'paid',
      guestType: 'regular',
      nationality: 'USA',
      idNumber: 'P123456789'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1987654321',
      roomNumber: '205',
      checkInDate: '12/08/2025',
      checkOutDate: '16/08/2025',
      status: 'checked-out',
      totalAmount: 680,
      paymentStatus: 'paid',
      guestType: 'vip',
      nationality: 'UK',
      idNumber: 'P987654321'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.j@corporate.com',
      phone: '+1122334455',
      roomNumber: '312',
      checkInDate: '20/08/2025',
      checkOutDate: '25/08/2025',
      status: 'reserved',
      totalAmount: 1200,
      paymentStatus: 'pending',
      guestType: 'corporate',
      nationality: 'Canada',
      idNumber: 'P456789123'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1555666777',
      roomNumber: '108',
      checkInDate: '14/08/2025',
      checkOutDate: '17/08/2025',
      status: 'checked-in',
      totalAmount: 390,
      paymentStatus: 'partial',
      guestType: 'regular',
      nationality: 'Australia',
      idNumber: 'P789123456'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [guestTypeFilter, setGuestTypeFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  // Filter and search guests
  const filteredGuests = useMemo(() => {
    return guests.filter(guest => {
      const matchesSearch = 
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone.includes(searchTerm) ||
        guest.roomNumber.includes(searchTerm) ||
        guest.idNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
      const matchesGuestType = guestTypeFilter === 'all' || guest.guestType === guestTypeFilter;
      const matchesPayment = paymentFilter === 'all' || guest.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesGuestType && matchesPayment;
    });
  }, [guests, searchTerm, statusFilter, guestTypeFilter, paymentFilter]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'checked-in': return 'status-checked-in';
      case 'checked-out': return 'status-checked-out';
      case 'reserved': return 'status-reserved';
      default: return '';
    }
  };

  const getPaymentClass = (payment: string) => {
    switch (payment) {
      case 'paid': return 'payment-paid';
      case 'pending': return 'payment-pending';
      case 'partial': return 'payment-partial';
      default: return '';
    }
  };

  const getGuestTypeClass = (type: string) => {
    switch (type) {
      case 'vip': return 'guest-vip';
      case 'corporate': return 'guest-corporate';
      case 'regular': return 'guest-regular';
      default: return '';
    }
  };

  return (
    <div className="guest-management-container">
      <div className="guest-management-header">
        <h1 className="page-title">Guest Management</h1>
        
        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, phone, room, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Guest Type:</label>
            <select 
              value={guestTypeFilter} 
              onChange={(e) => setGuestTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="regular">Regular</option>
              <option value="vip">VIP</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Payment:</label>
            <select 
              value={paymentFilter} 
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="guest-list">
        {filteredGuests.length === 0 ? (
          <div className="no-guests">No guests found matching your criteria.</div>
        ) : (
          filteredGuests.map(guest => (
            <div key={guest.id} className="guest-card">
              <div className="guest-header">
                <div className="guest-main-info">
                  <h3 className="guest-name">{guest.name}</h3>
                  <span className={`guest-type-badge ${getGuestTypeClass(guest.guestType)}`}>
                    {guest.guestType.toUpperCase()}
                  </span>
                </div>
                <div className="guest-status-info">
                  <span className={`status-badge ${getStatusClass(guest.status)}`}>
                    {guest.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="room-number">Room {guest.roomNumber}</span>
                </div>
              </div>

              <div className="guest-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <strong>Email:</strong> {guest.email}
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong> {guest.phone}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <strong>Check-in:</strong> {guest.checkInDate}
                  </div>
                  <div className="detail-item">
                    <strong>Check-out:</strong> {guest.checkOutDate}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <strong>Nationality:</strong> {guest.nationality}
                  </div>
                  <div className="detail-item">
                    <strong>ID Number:</strong> {guest.idNumber}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <strong>Total Amount:</strong> ${guest.totalAmount}
                  </div>
                  <div className="detail-item">
                    <strong>Payment:</strong> 
                    <span className={`payment-badge ${getPaymentClass(guest.paymentStatus)}`}>
                      {guest.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="guest-actions">
                <button className="action-btn view-btn">View Details</button>
                <button className="action-btn edit-btn">Edit</button>
                <button className="action-btn contact-btn">Contact</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="guest-summary">
        <div className="summary-item">
          <span className="summary-label">Total Guests:</span>
          <span className="summary-value">{filteredGuests.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Checked In:</span>
          <span className="summary-value">
            {filteredGuests.filter(g => g.status === 'checked-in').length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Reserved:</span>
          <span className="summary-value">
            {filteredGuests.filter(g => g.status === 'reserved').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuestManagement;