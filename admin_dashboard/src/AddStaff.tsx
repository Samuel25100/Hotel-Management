import React, { useState } from 'react';
import './style/AddStaff.css';

interface StaffFormData {
  profilePic: File | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNum: string;
  role: string;
  jobStatus: 'assigned' | 'off-site' | 'on-site';
  department: string;
  dateOfBirth: string;
  hireDate: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  salary: string;
  employeeId: string;
  notes: string;
}

const AddStaff: React.FC = () => {
  const [formData, setFormData] = useState<StaffFormData>({
    profilePic: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    role: '',
    jobStatus: 'assigned',
    department: '',
    dateOfBirth: '',
    hireDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    salary: '',
    employeeId: '',
    notes: ''
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<StaffFormData>>({});

  const handleInputChange = (field: keyof StaffFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePic: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StaffFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNum.trim()) newErrors.phoneNum = 'Phone number is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.hireDate) newErrors.hireDate = 'Hire date is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Staff data:', formData);
      // Add your API call here
      alert('Staff member added successfully!');
      // Reset form
      setFormData({
        profilePic: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNum: '',
        role: '',
        jobStatus: 'assigned',
        department: '',
        dateOfBirth: '',
        hireDate: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        salary: '',
        employeeId: '',
        notes: ''
      });
      setProfilePreview(null);
    }
  };

  const handleCancel = () => {
    setFormData({
      profilePic: null,
      firstName: '',
      lastName: '',
      email: '',
      phoneNum: '',
      role: '',
      jobStatus: 'assigned',
      department: '',
      dateOfBirth: '',
      hireDate: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelation: '',
      salary: '',
      employeeId: '',
      notes: ''
    });
    setProfilePreview(null);
    setErrors({});
  };

  return (
    <div className="add-staff-container">
      <div className="add-staff-box">
        <h1 className="page-title">Add New Staff Member</h1>
        
        <form onSubmit={handleSubmit} className="staff-form">
          {/* Profile Picture Section */}
          <div className="form-section">
            <h3 className="section-title">Profile Picture</h3>
            <div className="profile-upload-section">
              <div className="profile-preview">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile preview" className="preview-image" />
                ) : (
                  <div className="preview-placeholder">
                    <span>No image selected</span>
                  </div>
                )}
              </div>
              <div className="upload-controls">
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="profilePic" className="file-label">
                  Choose Profile Picture
                </label>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Employee ID *</label>
                <input
                  type="text"
                  className={`form-input ${errors.employeeId ? 'error' : ''}`}
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  placeholder="Enter employee ID"
                />
                {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className={`form-input ${errors.phoneNum ? 'error' : ''}`}
                  value={formData.phoneNum}
                  onChange={(e) => handleInputChange('phoneNum', e.target.value)}
                  placeholder="Enter phone number"
                />
                {errors.phoneNum && <span className="error-message">{errors.phoneNum}</span>}
              </div>

              <div className="form-group full-width">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="Enter zip code"
                />
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="form-section">
            <h3 className="section-title">Job Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Role *</label>
                <select
                  className={`form-select ${errors.role ? 'error' : ''}`}
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                >
                  <option value="">Select role</option>
                  <option value="Front Desk Manager">Front Desk Manager</option>
                  <option value="Housekeeping Supervisor">Housekeeping Supervisor</option>
                  <option value="Maintenance Engineer">Maintenance Engineer</option>
                  <option value="Guest Relations">Guest Relations</option>
                  <option value="Security Officer">Security Officer</option>
                  <option value="Restaurant Manager">Restaurant Manager</option>
                  <option value="Concierge">Concierge</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Housekeeper">Housekeeper</option>
                </select>
                {errors.role && <span className="error-message">{errors.role}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Department *</label>
                <select
                  className={`form-select ${errors.department ? 'error' : ''}`}
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <option value="">Select department</option>
                  <option value="Front Office">Front Office</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Security">Security</option>
                  <option value="Administration">Administration</option>
                  <option value="Guest Services">Guest Services</option>
                </select>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Job Status</label>
                <select
                  className="form-select"
                  value={formData.jobStatus}
                  onChange={(e) => handleInputChange('jobStatus', e.target.value as 'assigned' | 'off-site' | 'on-site')}
                >
                  <option value="assigned">Assigned</option>
                  <option value="on-site">On-site</option>
                  <option value="off-site">Off-site</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Hire Date *</label>
                <input
                  type="date"
                  className={`form-input ${errors.hireDate ? 'error' : ''}`}
                  value={formData.hireDate}
                  onChange={(e) => handleInputChange('hireDate', e.target.value)}
                />
                {errors.hireDate && <span className="error-message">{errors.hireDate}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  placeholder="Enter annual salary"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="form-section">
            <h3 className="section-title">Emergency Contact</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Contact Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  placeholder="Enter emergency contact name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  placeholder="Enter emergency contact phone"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Relationship</label>
                <select
                  className="form-select"
                  value={formData.emergencyContactRelation}
                  onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="form-section">
            <h3 className="section-title">Additional Notes</h3>
            <div className="form-group full-width">
              <label className="form-label">Notes</label>
              <textarea
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Enter any additional notes about the staff member"
                rows={4}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Staff Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;