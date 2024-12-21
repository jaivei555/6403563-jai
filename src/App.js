import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PerfumeList from './components/PerfumeList';
import AddPerfume from './components/AddPerfume';
import EditPerfume from './components/EditPerfume';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<PerfumeList />} />
            <Route path="/add" element={<AddPerfume />} />
            <Route path="/edit/:id" element={<EditPerfume />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;