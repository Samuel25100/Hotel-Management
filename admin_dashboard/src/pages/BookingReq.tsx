import React, { useEffect, useState } from 'react';
import '/src/style/BookingReq.css';
import ReloadBtn from '../components/ReloadBtn';
import api from '../api/api';

interface BookingRequest {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guestNumber: number;
  specialRequest: string;
  status: 'pending' | 'approved' | 'cancelled';
  bookingDate: string;
}

const BookingRequestPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const defaultData: BookingRequest[] = [
    {
      id: '1',
      guestName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      checkIn: '2025-08-15',
      checkOut: '2025-08-18',
      guestNumber: 2,
      specialRequest: 'Late check-in requested. Prefer room with ocean view.',
      status: 'pending',
      bookingDate: '2025-07-20'
    },
    {
      id: '2',
      guestName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      checkIn: '2025-08-22',
      checkOut: '2025-08-25',
      guestNumber: 1,
      specialRequest: '',
      status: 'approved',
      bookingDate: '2025-07-18'
    },
    {
      id: '3',
      guestName: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 345-6789',
      checkIn: '2025-09-01',
      checkOut: '2025-09-05',
      guestNumber: 4,
      specialRequest: 'Anniversary celebration. Need extra towels and room decoration if possible.',
      status: 'pending',
      bookingDate: '2025-07-25'
    },
    {
      id: '4',
      guestName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      checkIn: '2025-08-10',
      checkOut: '2025-08-12',
      guestNumber: 2,
      specialRequest: 'Wheelchair accessible room required.',
      status: 'cancelled',
      bookingDate: '2025-07-15'
    },
    {
      id: '5',
      guestName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 567-8901',
      checkIn: '2025-08-28',
      checkOut: '2025-08-30',
      guestNumber: 3,
      specialRequest: '',
      status: 'approved',
      bookingDate: '2025-07-22'
    }
  ];
  useEffect(() => {
    // Fetch booking requests from API or perform any setup
    try {
      console.log('Fetching booking requests...');
      api.get('/admin/bookings', {
        "headers": {
          "Authorization": "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log('API response:', response);
        if (response.status === 200) {
          console.log('Booking requests fetched successfully:', response.data);
          const listOfBooking = response.data || [];
          let bookingList: BookingRequest[] = [];
          for (let i = 0; i < listOfBooking.length; i++) {
            let book: BookingRequest = {
              id: (i + 1).toString(),
              guestName: listOfBooking[i].guestsId.name,
              email: listOfBooking[i].guestsId.email,
              phone: listOfBooking[i].guestsId.phone,
              checkIn: String(listOfBooking[i].checkIn),
              checkOut: listOfBooking[i].checkOut,
              guestNumber: listOfBooking[i].guests,
              specialRequest: listOfBooking[i].specialRequests,
              status: listOfBooking[i].status,
              bookingDate: listOfBooking[i].createdAt
            };
            console.log('Booking request created:', book);
            bookingList.push(book);
          }
          setBookingRequests(bookingList || defaultData);
        }})
    } catch(error) {
      console.error('Error fetching booking requests:', error);
    }
  }, [refresh]);

  const handleSearch = () => {
    // Filter logic would go here
    console.log('Searching for:', searchTerm);
  };

  const handleStatusChange = (id: string, newStatus: 'approved' | 'cancelled') => {
    setBookingRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleRefresh: () => void = () => {
    setRefresh(prev => !prev);
  };
  const calculateNights = (checkIn: string, checkOut: string): number => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'approved':
        return 'status-approved';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  const filteredRequests = bookingRequests.filter(request =>
    request.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.phone.includes(searchTerm)
  );

  return (
    <div className="request-app-container">
      {/* Main Request Management Content */}
      <div className="request-main">
        <div className="request-container">
        <ReloadBtn handleRefresh={handleRefresh} output="Booking Requests Management" />

          {/* Search Box */}
          <div className="search-box">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search by guest name, email, or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                Search
              </button>
            </div>
          </div>

          {/* Request Management Table */}
          <div className="request-management-box">
            <h2 className="management-title">Request Management</h2>
            
            <div className="requests-table">
              {/* Table Header */}
              <div className="table-header">
                <div className="header-cell guest-info-header">Guest Information</div>
                <div className="header-cell reservation-details-header">Reservation Details</div>
                <div className="header-cell special-requests-header">Special Requests</div>
                <div className="header-cell status-header">Status</div>
                <div className="header-cell actions-header">Actions</div>
              </div>

              {/* Table Body */}
              <div className="table-body">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="table-row">
                    {/* Guest Information */}
                    <div className="table-cell guest-info-cell">
                      <div className="guest-info">
                        <div className="guest-name">{request.guestName}</div>
                        <div className="guest-email">{request.email}</div>
                        <div className="guest-phone">{request.phone}</div>
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="table-cell reservation-details-cell">
                      <div className="reservation-details">
                        <div className="detail-row">
                          <span className="detail-label">Check-in:</span>
                          <span className="detail-value">{formatDate(request.checkIn)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Check-out:</span>
                          <span className="detail-value">{formatDate(request.checkOut)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Guests:</span>
                          <span className="detail-value">{request.guestNumber}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Stay:</span>
                          <span className="detail-value">{calculateNights(request.checkIn, request.checkOut)} nights</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="table-cell special-requests-cell">
                      <div className="special-requests">
                        {request.specialRequest || <span className="no-requests">No special requests</span>}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="table-cell status-cell">
                      <div className="status-container">
                        <div className={`status-badge ${getStatusClass(request.status)}`}>
                          {request.status.toUpperCase()}
                        </div>
                        <div className="booking-date">
                          {formatDate(request.bookingDate)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="table-cell actions-cell">
                      <div className="action-buttons">
                        <button
                          className="approve-btn"
                          onClick={() => handleStatusChange(request.id, 'approved')}
                          disabled={request.status === 'approved'}
                        >
                          Approve
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleStatusChange(request.id, 'cancelled')}
                          disabled={request.status === 'cancelled'}
                        >
                          Cancel
                        </button>
                        <button
                          className="approve-btn"
                          onClick={() => handleStatusChange(request.id, 'approved')}
                          disabled={request.status === 'approved'}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredRequests.length === 0 && (
              <div className="no-results">
                <p>No booking requests found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestPage;