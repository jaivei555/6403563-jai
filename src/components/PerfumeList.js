import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './PerfumeList.css';

function PerfumeList() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'perfumes'));
      const perfumeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPerfumes(perfumeList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching perfumes:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบน้ำหอมนี้ใช่หรือไม่?')) {
      try {
        await deleteDoc(doc(db, 'perfumes', id));
        setPerfumes(perfumes.filter(perfume => perfume.id !== id));
      } catch (error) {
        console.error('Error deleting perfume:', error);
      }
    }
  };

  if (loading) {
    return <div>กำลังโหลด...</div>;
  }

  return (
    <div className="perfume-list-container">
      <h1 className="page-title">รายการน้ำหอมทั้งหมด</h1>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>กำลังโหลด...</p>
        </div>
      ) : (
        <div className="perfume-grid">
          {perfumes.map((perfume) => (
            <div key={perfume.id} className="perfume-card">
              <div className="perfume-image">
                <i className="fas fa-spray-can"></i>
              </div>
              <div className="perfume-content">
                <h2 className="perfume-name">{perfume.name}</h2>
                <p className="perfume-brand">{perfume.brand}</p>
                <p className="perfume-price">{perfume.price.toLocaleString()} บาท</p>
                <p className="perfume-description">{perfume.description}</p>
                <div className="perfume-actions">
                  <Link to={`/edit/${perfume.id}`} className="edit-button">
                    <i className="fas fa-edit"></i> แก้ไข
                  </Link>
                  <button onClick={() => handleDelete(perfume.id)} className="delete-button">
                    <i className="fas fa-trash"></i> ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PerfumeList;