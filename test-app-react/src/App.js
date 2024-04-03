import './App.css';
import api from './api/axiosConfig'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'
import AddPatient from './Pages/AddPatient/AddPatient'
import DeletePatient from './Pages/DeletePatient/DeletePatient'
import EditPatient from './Pages/EditPatient/EditPatient'
import ListPatient from './Pages/ListPatient/ListPatient'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddPatient" element={<AddPatient />} />
      <Route path="/DeletePatient" element={<DeletePatient />} />
      <Route path="/EditPatient" element={<EditPatient />} />
      <Route path="/ListPatient" element={<ListPatient />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
