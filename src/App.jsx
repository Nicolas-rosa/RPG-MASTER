import './index.css'
import Info from './pages/Info'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Criar from './pages/Criar'
import Contact from './pages/Contact'

function App() {
  
  return (
    <>
    <Router>
<Header/>
  <Routes>
<Route path='/' element={<Home/>} />
<Route path='/Criar' element={<Criar/>} />
<Route path='/Info' element={<Info/>} />
<Route path='/Contact' element={<Contact/>} />
  </Routes>
  </Router>
    </>
  )
}

export default App
