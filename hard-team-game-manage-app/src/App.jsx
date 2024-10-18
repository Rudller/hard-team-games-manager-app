import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/App.css'
import Dev from './pages/Dev'
import Home from './pages/Home'
import SingUp from './pages/SingUp'
import SingIn from './pages/SingIn'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dev" element={<Dev />} />
          <Route path="/" element={<Home />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/singin" element={<SingIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
