import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import LoginPage from './pages/LoginPage'
import Player from './pages/Player'



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/login' element={<LoginPage/>}/>
    <Route exact path='/signup' element={<Signup/>}/>
    <Route exact path='/player' element={<Player/>}/>
    <Route exact path='/' element={<Netflix/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}
