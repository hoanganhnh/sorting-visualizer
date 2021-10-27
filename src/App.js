import React from 'react'

import SortingVisualier from './components/SortingVisualier'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <div className="App">
            <NavBar />
            <SortingVisualier />
            <Footer />
        </div>
    )
}

export default App
