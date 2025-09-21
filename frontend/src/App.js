import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import MentionsLegales from './pages/MentionsLegales';  
import AdminContacts from './pages/AdminContacts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />  
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/admin-contacts" element={<AdminContacts />} />
      </Routes>
    </Router>
  );
}

export default App;
