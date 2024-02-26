import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IngresoPage from './pages/IngresoPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<IngresoPage/>}/>
      <Route path='/ing' element={<IngresoPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App