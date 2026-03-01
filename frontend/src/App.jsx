import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Predict from './pages/Predict'
import Trends from './pages/Trends'
import EcoScore from './pages/EcoScore'
import Admin from './pages/Admin'

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
                <Navbar />

                {/* Background Gradients */}
                <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
                <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

                <main className="flex-1 relative z-10 w-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/predict" element={<Predict />} />
                        <Route path="/trends" element={<Trends />} />
                        <Route path="/eco" element={<EcoScore />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
