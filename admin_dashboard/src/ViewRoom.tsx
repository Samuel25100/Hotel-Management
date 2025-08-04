import React, { useState, useMemo } from 'react';
import './style/ViewRoom.css';

interface Room {
  id: string;
  roomNumber: string;
  type: string;
  floor: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
  price: number;
}

const ViewRoom: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    roomType: 'All Types',
    floor: 'All Floors',
    status: 'All Status',
    maxPrice: 'Max Price'
  });

  // Mock room data
  const rooms: Room[] = [
    { id: '101', roomNumber: '101', type: 'Standard Single', floor: 1, status: 'Available', price: 120 },
    { id: '102', roomNumber: '102', type: 'Standard Double', floor: 1, status: 'Occupied', price: 150 },
    { id: '103', roomNumber: '103', type: 'Deluxe Queen', floor: 1, status: 'Available', price: 200 },
    { id: '104', roomNumber: '104', type: 'Standard Single', floor: 1, status: 'Maintenance', price: 120 },
    { id: '201', roomNumber: '201', type: 'Executive Suite', floor: 2, status: 'Available', price: 350 },
    { id: '202', roomNumber: '202', type: 'Deluxe King', floor: 2, status: 'Occupied', price: 240 },
    { id: '203', roomNumber: '203', type: 'Standard Twin', floor: 2, status: 'Available', price: 140 },
    { id: '204', roomNumber: '204', type: 'Family Room', floor: 2, status: 'Available', price: 280 },
    { id: '301', roomNumber: '301', type: 'Presidential Suite', floor: 3, status: 'Available', price: 500 },
    { id: '302', roomNumber: '302', type: 'Junior Suite', floor: 3, status: 'Occupied', price: 300 },
    { id: '303', roomNumber: '303', type: 'Deluxe Queen', floor: 3, status: 'Maintenance', price: 200 },
    { id: '304', roomNumber: '304', type: 'Standard Double', floor: 3, status: 'Available', price: 150 },
    { id: '401', roomNumber: '401', type: 'Penthouse Suite', floor: 4, status: 'Available', price: 800 },
    { id: '402', roomNumber: '402', type: 'Executive Suite', floor: 4, status: 'Occupied', price: 350 },
    { id: '403', roomNumber: '403', type: 'Deluxe King', floor: 4, status: 'Available', price: 240 },
    { id: '404', roomNumber: '404', type: 'Junior Suite', floor: 4, status: 'Maintenance', price: 300 },
    { id: '501', roomNumber: '501', type: 'Royal Suite', floor: 5, status: 'Available', price: 600 },
    { id: '502', roomNumber: '502', type: 'Standard Double', floor: 5, status: 'Available', price: 150 },
    { id: '503', roomNumber: '503', type: 'Family Room', floor: 5, status: 'Occupied', price: 280 },
    { id: '504', roomNumber: '504', type: 'Deluxe Queen', floor: 5, status: 'Available', price: 200 }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Filter rooms based on search and filters
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filters.roomType === 'All Types' || room.type === filters.roomType;
      
      const matchesFloor = filters.floor === 'All Floors' || 
                          room.floor === parseInt(filters.floor.replace(/\D/g, ''));
      
      const matchesStatus = filters.status === 'All Status' || room.status === filters.status;
      
      const matchesPrice = filters.maxPrice === 'Max Price' || 
                          room.price <= parseInt(filters.maxPrice.replace(/\D/g, ''));

      return matchesSearch && matchesType && matchesFloor && matchesStatus && matchesPrice;
    });
  }, [searchTerm, filters, rooms]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = rooms.length;
    const available = rooms.filter(room => room.status === 'Available').length;
    const occupied = rooms.filter(room => room.status === 'Occupied').length;
    const maintenance = rooms.filter(room => room.status === 'Maintenance').length;
    
    return { total, available, occupied, maintenance };
  }, [rooms]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'status-available';
      case 'Occupied':
        return 'status-occupied';
      case 'Maintenance':
        return 'status-maintenance';
      default:
        return '';
    }
  };

  const getFloorSuffix = (floor: number) => {
    if (floor === 1) return '1st';
    if (floor === 2) return '2nd';
    if (floor === 3) return '3rd';
    return `${floor}th`;
  };

  // Get unique values for dropdowns
  const uniqueRoomTypes = Array.from(new Set(rooms.map(room => room.type)));
  const uniqueFloors = Array.from(new Set(rooms.map(room => room.floor))).sort((a, b) => a - b);
  const priceRanges = ['100', '200', '300', '400', '500', '600', '700', '800'];

  return (
    <div className="room-app-container">
      {/* Main Room Management Content */}
      <div className="room-main">
        <div className="room-container">
          <h1 className="room-page-title">Room Management</h1>
          
          {/* Search Bar */}
          <div className="search-bar">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search rooms by number or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                Search
              </button>
            </div>
          </div>

          {/* Statistics Boxes */}
          <div className="stats-container">
            <div className="stat-box total-rooms">
              <div className="stat-title">Total Rooms</div>
              <div className="stat-number">{stats.total}</div>
            </div>
            <div className="stat-box available-rooms">
              <div className="stat-title">Available</div>
              <div className="stat-number">{stats.available}</div>
            </div>
            <div className="stat-box occupied-rooms">
              <div className="stat-title">Occupied</div>
              <div className="stat-number">{stats.occupied}</div>
            </div>
            <div className="stat-box maintenance-rooms">
              <div className="stat-title">Maintenance</div>
              <div className="stat-number">{stats.maintenance}</div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="filter-group">
              <label className="filter-label">Room Types</label>
              <select 
                value={filters.roomType}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                className="filter-select"
              >
                <option value="All Types">All Types</option>
                {uniqueRoomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Floor</label>
              <select 
                value={filters.floor}
                onChange={(e) => handleFilterChange('floor', e.target.value)}
                className="filter-select"
              >
                <option value="All Floors">All Floors</option>
                {uniqueFloors.map(floor => (
                  <option key={floor} value={`${floor}`}>{getFloorSuffix(floor)} Floor</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="filter-select"
              >
                <option value="All Status">All Status</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Maximum Price</label>
              <select 
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="filter-select"
              >
                <option value="Max Price">Max Price</option>
                {priceRanges.map(price => (
                  <option key={price} value={price}>Up to ${price}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="rooms-container">
            <div className="rooms-grid">
              {filteredRooms.map(room => (
                <div key={room.id} className="room-card">
                  <div className="room-header">
                    <span className="room-number">Room {room.roomNumber}</span>
                    <span className={`room-status ${getStatusClass(room.status)}`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="room-type">{room.type}</div>
                  <div className="room-floor">Floor: {getFloorSuffix(room.floor)} floor</div>
                  <div className="room-price">${room.price}/night</div>
                </div>
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="no-rooms">
                <p>No rooms found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;