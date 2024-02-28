import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IngresoPage from './pages/IngresoPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<IngresoPage/>}/>
      <Route path='/ing' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App