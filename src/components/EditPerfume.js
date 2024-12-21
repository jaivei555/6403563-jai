import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './EditForm.css';

function EditPerfume() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const docRef = doc(db, 'perfumes', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          setError('ไม่พบข้อมูลน้ำหอมที่ต้องการแก้ไข');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchPerfume();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'perfumes', id);
      await updateDoc(docRef, {
        ...formData,
        price: Number(formData.price)
      });
      navigate('/');
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  if (loading) {
    return (
      <div className="edit-loading">
        <div className="spinner"></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-error">
        <i className="fas fa-exclamation-circle"></i>
        <h2>เกิดข้อผิดพลาด</h2>
        <p>{error}</p>
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-container">
      <div className="edit-header">
        <h1 className="edit-title">
          <i className="fas fa-edit"></i>
          แก้ไขข้อมูลน้ำหอม
        </h1>
        <Link to="/" className="back-link">
          <i className="fas fa-arrow-left"></i> กลับหน้าหลัก
        </Link>
      </div>

      <div className="edit-card">
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-signature"></i> ชื่อน้ำหอม
            </label>
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
            <label className="form-label">
              <i className="fas fa-building"></i> แบรนด์
            </label>
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
            <label className="form-label">
              <i className="fas fa-tag"></i> ราคา
            </label>
            <div className="price-input-container">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input price-input"
                required
              />
              <span className="price-currency">บาท</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-info-circle"></i> รายละเอียด
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              <i className="fas fa-save"></i> บันทึกการแก้ไข
            </button>
            <Link to="/" className="cancel-button">
              <i className="fas fa-times"></i> ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPerfume;