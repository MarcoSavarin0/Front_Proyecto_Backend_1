import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Pacientes } from './Pages/Pacientes';
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<Pacientes />} />
      </Routes>
    </>
  )
}
