import React, { useState } from 'react';
import './style/Dashboard.css';

interface DashboardData {
  id: number;
  title: string;
  value: string | number;
  category: 'booking' | 'registration' | 'revenue' | 'bill' | 'checkin';
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  description?: string;
}

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState({
    timePeriod: 'All Time',
    category: 'All Categories',
    status: 'All Status'
  });

  // Sample dashboard data
  const dashboardData: DashboardData[] = [
    { id: 1, title: 'Total Bookings', value: 245, category: 'booking', status: 'active', description: 'This month' },
    { id: 2, title: 'Pending Bookings', value: 28, category: 'booking', status: 'pending', description: 'Awaiting confirmation' },
    { id: 3, title: 'New Registrations', value: 67, category: 'registration', status: 'completed', description: 'This week' },
    { id: 4, title: 'Total Revenue', value: '$45,230', category: 'revenue', status: 'active', description: 'This month' },
    { id: 5, title: 'Staff Members', value: 32, category: 'registration', status: 'active', description: 'Currently active' },
    { id: 6, title: 'Outstanding Bills', value: '$8,450', category: 'bill', status: 'pending', description: 'Due this week' },
    { id: 7, title: 'Check-ins Today', value: 18, category: 'checkin', status: 'completed', description: 'Completed today' },
    { id: 8, title: 'Check-outs Today', value: 22, category: 'checkin', status: 'completed', description: 'Completed today' },
    { id: 9, title: 'Cancelled Bookings', value: 12, category: 'booking', status: 'cancelled', description: 'This month' },
    { id: 10, title: 'Monthly Costs', value: '$12,800', category: 'bill', status: 'active', description: 'Operating expenses' },
    { id: 11, title: 'Average Revenue', value: '$1,507', category: 'revenue', status: 'active', description: 'Per day' },
    { id: 12, title: 'Occupancy Rate', value: '78%', category: 'booking', status: 'active', description: 'Current rate' }
  ];

  const getHighlightColor = (category: string): string => {
    switch (category) {
      case 'booking':
        return '#87CEEB'; // sky blue
      case 'registration':
        return '#FFA500'; // orange
      case 'revenue':
        return '#32CD32'; // green
      case 'bill':
        return '#FF4444'; // red
      case 'checkin':
        return '#FFA500'; // orange
      default:
        return '#87CEEB';
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleApplyFilter = () => {
    console.log('Applying filters:', filters);
    // Add filter logic here
  };

  const handleResetFilter = () => {
    setFilters({
      timePeriod: 'All Time',
      category: 'All Categories',
      status: 'All Status'
    });
  };

  return (
    <div className="dashboard">
      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-group">
          <label className="filter-label">Time Period</label>
          <select 
            className="filter-dropdown"
            value={filters.timePeriod}
            onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
          >
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select 
            className="filter-dropdown"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="booking">Booking</option>
            <option value="registration">Registration & Staff</option>
            <option value="revenue">Revenue</option>
            <option value="bill">Bills & Costs</option>
            <option value="checkin">Check-in/out</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select 
            className="filter-dropdown"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-buttons">
          <button className="apply-btn" onClick={handleApplyFilter}>
            Apply Filter
          </button>
          <button className="reset-btn" onClick={handleResetFilter}>
            Reset
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {dashboardData.map((item) => (
          <div 
            key={item.id} 
            className="dashboard-box"
            style={{ borderLeftColor: getHighlightColor(item.category) }}
          >
            <div className="box-header">
              <h3 className="box-title">{item.title}</h3>
              <span className={`status-badge ${item.status}`}>
                {item.status}
              </span>
            </div>
            <div className="box-value">{item.value}</div>
            {item.description && (
              <div className="box-description">{item.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;