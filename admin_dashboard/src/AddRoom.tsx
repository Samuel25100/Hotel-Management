import React, { useState } from 'react';
import './style/AddRoom.css';

interface RoomData {
  roomType: string;
  floor: string;
  price: string;
  roomNumber: string;
  description: string;
}

const AddRoom: React.FC = () => {
  const [roomData, setRoomData] = useState<RoomData>({
    roomType: '',
    floor: '',
    price: '',
    roomNumber: '',
    description: ''
  });

  const handleInputChange = (field: keyof RoomData, value: string) => {
    setRoomData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Room data:', roomData);
    // Add your room submission logic here
  };

  return (
    <div className="add-room-container">
      <div className="add-room-box">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Room type</label>
            <select 
              className="form-dropdown"
              value={roomData.roomType}
              onChange={(e) => handleInputChange('roomType', e.target.value)}
            >
              <option value="">Select room type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Floor</label>
            <select 
              className="form-dropdown"
              value={roomData.floor}
              onChange={(e) => handleInputChange('floor', e.target.value)}
            >
              <option value="">Select floor</option>
              <option value="1">1st Floor</option>
              <option value="2">2nd Floor</option>
              <option value="3">3rd Floor</option>
              <option value="4">4th Floor</option>
              <option value="5">5th Floor</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Price</label>
            <input 
              type="text"
              className="form-input"
              placeholder="Enter price"
              value={roomData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Room number</label>
            <input 
              type="text"
              className="form-input"
              placeholder="Enter room number"
              value={roomData.roomNumber}
              onChange={(e) => handleInputChange('roomNumber', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label className="form-label">Description</label>
            <textarea 
              className="form-textarea"
              placeholder="Enter room description"
              value={roomData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="button-container">
          <button className="add-room-btn" onClick={handleSubmit}>
            Add room
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;