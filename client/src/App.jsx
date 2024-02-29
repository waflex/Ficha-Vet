import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IngresoPage from './pages/IngresoPage'
import LoginPage from './pages/LoginPage'
import FichaMedicaPage from './pages/FichaMedicaPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<IngresoPage/>}/>
      <Route path='/ing' element={<LoginPage/>}/>
      <Route path='/fich' element={<FichaMedicaPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App