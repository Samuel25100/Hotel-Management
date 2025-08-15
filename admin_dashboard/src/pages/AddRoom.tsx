import React, { useState } from 'react';
import '/src/style/AddRoom.css';
import ImageUploader from '../utils/ImageUploader';
import api from '../api/api';

interface RoomData {
  roomType: string;
  floor: string;
  price: string;
  roomNumber: string;
  description: string;
  capacity: number;
  amenities: string;
}
interface RoomAPI {
  number: string;
  type: string;
  price: string;
  description: string;
  capacity: number;
  amenities: string[];
  images: string[];
}
interface SelectedImage {
  file: File;
  url: string;
  name: string;
}


const AddRoom: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [roomData, setRoomData] = useState<RoomData>({
    roomType: '',
    floor: '',
    price: '',
    roomNumber: '',
    description: '',
    capacity: 0,
    amenities: "",
  });


  const handleInputChange = (field: keyof RoomData, value: string) => {
    setRoomData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    console.log('Room data:', roomData);
    // Add your room submission logic here
    const roomAPIData: RoomAPI = {
      number: ((Number(roomData.floor) * 100) + Number(roomData.roomNumber)).toString(),
      type: roomData.roomType,
      price: roomData.price,
      description: roomData.description,
      capacity: roomData.capacity,
      amenities: roomData.amenities.split(/[ ,]+/).map(item => item.trim()),
      images: []
    };
    try {
      const response = await api.post('/rooms', {
          ...roomAPIData
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        }});
      if (response.status === 201) {
          alert('Room created successfully');
      } else if (response.status === 400) {
          console.error('Error creating room:', response.data);
      } else if (response.status === 409) {
          alert('Room number already exists');
      }
      setRoomData({
            roomType: '',
            floor: '',
            price: '',
            roomNumber: '',
            description: '',
            capacity: 0,
            amenities: '',
        });
    } catch (error) {
      console.log("Data that is sent:", roomAPIData);
      console.error('Error creating room:', error);
    }
    setSelectedImages([]);
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
          <div className="form-group">
            <label className="form-label">Max Capacity</label>
            <input 
              type="number"
              className="form-input"
              placeholder="Max Guests"
              value={roomData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Amenities</label>
            <input 
              type="text"
              className="form-input"
              placeholder="WIFI, TV, AC"
              value={roomData.amenities}
              onChange={(e) => handleInputChange('amenities', e.target.value)}
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
        <ImageUploader selectedImages={selectedImages} setSelectedImages={setSelectedImages} />

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