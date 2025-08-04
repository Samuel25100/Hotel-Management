import React, { useState, useMemo } from 'react';
import './style/ViewStaff.css';

interface Staff {
  id: string;
  profilePic: string;
  jobStatus: 'assigned' | 'off-site' | 'on-site';
  registered: string;
  role: string;
  fullName: string;
  email: string;
  phoneNum: string;
}

const StaffManagement: React.FC = () => {
  // Sample staff data
  const [staff] = useState<Staff[]>([
    {
      id: '1',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      jobStatus: 'on-site',
      registered: '15/01/2024',
      role: 'Front Desk Manager',
      fullName: 'John Anderson',
      email: 'john.anderson@hotel.com',
      phoneNum: '+1234567890'
    },
    {
      id: '2',
      profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      jobStatus: 'assigned',
      registered: '22/03/2024',
      role: 'Housekeeping Supervisor',
      fullName: 'Sarah Martinez',
      email: 'sarah.martinez@hotel.com',
      phoneNum: '+1987654321'
    },
    {
      id: '3',
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      jobStatus: 'off-site',
      registered: '08/11/2023',
      role: 'Maintenance Engineer',
      fullName: 'Michael Chen',
      email: 'michael.chen@hotel.com',
      phoneNum: '+1122334455'
    },
    {
      id: '4',
      profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      jobStatus: 'on-site',
      registered: '12/06/2024',
      role: 'Guest Relations',
      fullName: 'Emily Johnson',
      email: 'emily.johnson@hotel.com',
      phoneNum: '+1555666777'
    },
    {
      id: '5',
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      jobStatus: 'assigned',
      registered: '30/09/2023',
      role: 'Security Officer',
      fullName: 'David Wilson',
      email: 'david.wilson@hotel.com',
      phoneNum: '+1888999000'
    },
    {
      id: '6',
      profilePic: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      jobStatus: 'on-site',
      registered: '18/02/2024',
      role: 'Restaurant Manager',
      fullName: 'Lisa Thompson',
      email: 'lisa.thompson@hotel.com',
      phoneNum: '+1777888999'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Get unique roles for filter
  const uniqueRoles = useMemo(() => {
    return Array.from(new Set(staff.map(s => s.role))).sort();
  }, [staff]);

  // Filter staff based on search and filters
  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      const matchesSearch = 
        member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phoneNum.includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || member.jobStatus === statusFilter;
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [staff, searchTerm, statusFilter, roleFilter]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'on-site': return 'status-on-site';
      case 'off-site': return 'status-off-site';
      case 'assigned': return 'status-assigned';
      default: return '';
    }
  };

  const handleAction = (staffId: string, action: string) => {
    console.log(`Action: ${action} for staff ID: ${staffId}`);
    setOpenDropdown(null);
    // Add your action logic here
  };

  const toggleDropdown = (staffId: string) => {
    setOpenDropdown(openDropdown === staffId ? null : staffId);
  };

  return (
    <div className="staff-management-container">
      <div className="staff-management-header">
        <h1 className="page-title">Staff Management</h1>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, phone, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label>Job Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="on-site">On-site</option>
                <option value="off-site">Off-site</option>
                <option value="assigned">Assigned</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Role:</label>
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="table-container">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>Job Status</th>
              <th>Registered</th>
              <th>Role</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-staff">
                  No staff members found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredStaff.map(member => (
                <tr key={member.id} className="staff-row">
                  <td className="profile-pic-cell">
                    <div className="profile-pic-container">
                      <img 
                        src={member.profilePic} 
                        alt={member.fullName}
                        className="profile-pic"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.fullName)}&background=6c757d&color=fff&size=150`;
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(member.jobStatus)}`}>
                      {member.jobStatus.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="registered-cell">{member.registered}</td>
                  <td className="role-cell">{member.role}</td>
                  <td className="name-cell">{member.fullName}</td>
                  <td className="email-cell">{member.email}</td>
                  <td className="phone-cell">{member.phoneNum}</td>
                  <td className="actions-cell">
                    <div className="actions-dropdown">
                      <button 
                        className="actions-btn"
                        onClick={() => toggleDropdown(member.id)}
                      >
                        Actions ▼
                      </button>
                      {openDropdown === member.id && (
                        <div className="dropdown-menu">
                          <button 
                            className="dropdown-item"
                            onClick={() => handleAction(member.id, 'view')}
                          >
                            View Profile
                          </button>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleAction(member.id, 'edit')}
                          >
                            Edit Details
                          </button>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleAction(member.id, 'schedule')}
                          >
                            View Schedule
                          </button>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleAction(member.id, 'contact')}
                          >
                            Send Message
                          </button>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleAction(member.id, 'performance')}
                          >
                            Performance Review
                          </button>
                          <button 
                            className="dropdown-item warning"
                            onClick={() => handleAction(member.id, 'suspend')}
                          >
                            Suspend
                          </button>
                          <button 
                            className="dropdown-item danger"
                            onClick={() => handleAction(member.id, 'terminate')}
                          >
                            Terminate
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="staff-summary">
        <div className="summary-item">
          <span className="summary-label">Total Staff:</span>
          <span className="summary-value">{filteredStaff.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">On-site:</span>
          <span className="summary-value">
            {filteredStaff.filter(s => s.jobStatus === 'on-site').length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Assigned:</span>
          <span className="summary-value">
            {filteredStaff.filter(s => s.jobStatus === 'assigned').length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Off-site:</span>
          <span className="summary-value">
            {filteredStaff.filter(s => s.jobStatus === 'off-site').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;