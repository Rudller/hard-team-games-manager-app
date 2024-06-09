import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/App.css'
import Dev from './pages/Dev'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dev" element={<Dev />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
