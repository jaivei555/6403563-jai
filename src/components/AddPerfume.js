import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function AddPerfume() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'perfumes'), {
        ...formData,
        price: Number(formData.price)
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding perfume:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">เพิ่มน้ำหอม</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">ชื่อน้ำหอม</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">แบรนด์</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">ราคา</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">รายละเอียด</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          บันทึก
        </button>
      </form>
    </div>
  );
}

export default AddPerfume;