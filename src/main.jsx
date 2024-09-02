import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Live from '../Live.jsx'
import Recent from '../Recent.jsx'
import Upcoming from '../Upcoming.jsx'
import DetailScorecard from "./Components/DetailScorecard"

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    {/* <div>
    <App />
    </div> */}
     <Routes>
        <Route path="/" element={<Live/>}/>
        <Route path="/recent" element={<Recent/>}/>
        <Route path="/upcoming" element={<Upcoming/>}/>
        <Route path="/scorecard/:id" element={<DetailScorecard/>} />
      </Routes>
 </BrowserRouter>
)
