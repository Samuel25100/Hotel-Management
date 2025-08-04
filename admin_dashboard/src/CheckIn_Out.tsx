import React, { useState } from 'react';
import './style/CheckIn_Out.css';

interface TimeSettings {
  checkIn: {
    time: string;
    date: string;
  };
  checkOut: {
    time: string;
    date: string;
  };
}

const CheckInCheckOut: React.FC = () => {
  const [timeSettings, setTimeSettings] = useState<TimeSettings>({
    checkIn: {
      time: '14:00',
      date: '15/08/2025'
    },
    checkOut: {
      time: '11:00',
      date: '16/08/2025'
    }
  });

  const [editMode, setEditMode] = useState<{
    checkIn: boolean;
    checkOut: boolean;
  }>({
    checkIn: false,
    checkOut: false
  });

  const [tempValues, setTempValues] = useState<TimeSettings>({
    checkIn: { time: '', date: '' },
    checkOut: { time: '', date: '' }
  });

  const handleEdit = (type: 'checkIn' | 'checkOut') => {
    setTempValues(prev => ({
      ...prev,
      [type]: {
        time: timeSettings[type].time,
        date: timeSettings[type].date
      }
    }));
    setEditMode(prev => ({
      ...prev,
      [type]: true
    }));
  };

  const handleSet = (type: 'checkIn' | 'checkOut') => {
    setTimeSettings(prev => ({
      ...prev,
      [type]: {
        time: tempValues[type].time,
        date: tempValues[type].date
      }
    }));
    setEditMode(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const handleCancel = (type: 'checkIn' | 'checkOut') => {
    setEditMode(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const handleTempChange = (type: 'checkIn' | 'checkOut', field: 'time' | 'date', value: string) => {
    setTempValues(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  return (
    <div className="checkin-checkout-container">
      <div className="checkin-checkout-box">
        <h2 className="page-title">Check-in/out Settings</h2>
        
        {/* Check-in Section */}
        <div className="time-section">
          <div className="time-display">
            <span className="time-label">Check-in:</span>
            <span className="time-value">
              {timeSettings.checkIn.time} {timeSettings.checkIn.date}
            </span>
            <button 
              className="edit-btn"
              onClick={() => handleEdit('checkIn')}
              disabled={editMode.checkIn}
            >
              Edit
            </button>
          </div>
          
          {editMode.checkIn && (
            <div className="edit-form">
              <div className="form-inputs">
                <input 
                  type="time"
                  className="time-input"
                  value={tempValues.checkIn.time}
                  onChange={(e) => handleTempChange('checkIn', 'time', e.target.value)}
                />
                <input 
                  type="text"
                  className="date-input"
                  placeholder="DD/MM/YYYY"
                  value={tempValues.checkIn.date}
                  onChange={(e) => handleTempChange('checkIn', 'date', e.target.value)}
                />
              </div>
              <div className="form-buttons">
                <button 
                  className="set-btn"
                  onClick={() => handleSet('checkIn')}
                >
                  Set
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => handleCancel('checkIn')}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Check-out Section */}
        <div className="time-section">
          <div className="time-display">
            <span className="time-label">Check-out:</span>
            <span className="time-value">
              {timeSettings.checkOut.time} {timeSettings.checkOut.date}
            </span>
            <button 
              className="edit-btn"
              onClick={() => handleEdit('checkOut')}
              disabled={editMode.checkOut}
            >
              Edit
            </button>
          </div>
          
          {editMode.checkOut && (
            <div className="edit-form">
              <div className="form-inputs">
                <input 
                  type="time"
                  className="time-input"
                  value={tempValues.checkOut.time}
                  onChange={(e) => handleTempChange('checkOut', 'time', e.target.value)}
                />
                <input 
                  type="text"
                  className="date-input"
                  placeholder="DD/MM/YYYY"
                  value={tempValues.checkOut.date}
                  onChange={(e) => handleTempChange('checkOut', 'date', e.target.value)}
                />
              </div>
              <div className="form-buttons">
                <button 
                  className="set-btn"
                  onClick={() => handleSet('checkOut')}
                >
                  Set
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => handleCancel('checkOut')}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInCheckOut;