import React, { useState, useEffect } from 'react'

import './NavBar.css'

const useClickOutside = (ref, callback) => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }
    React.useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}

function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSpeed, setShowSpeed] = useState(false)

    const dropdownRef = React.useRef()
    const speedRef = React.useRef()

    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }
    const handleShowSpeed = () => {
        setShowSpeed(!showSpeed)
    }
    useClickOutside(dropdownRef, () => setShowDropdown(false))
    useClickOutside(speedRef, () => setShowSpeed(false))
    return (
        <div className="nav-warraper">
            <div className="logo-container">Logo</div>
            <div className="nav-content">
                <div className="nav-item">Reset Array</div>
                <div
                    className={`nav-item ${showDropdown ? 'btn-active' : ''}`}
                    aria-hidden="true"
                    onClick={handleShowDropdown}
                    ref={dropdownRef}
                >
                    Algorithms
                    <span
                        className={`caret ${showDropdown ? 'caret-animations' : ''}`}
                    />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <ul className="list-algorithm">
                                <li className="algorithm">Quick Sort</li>
                                <li className="algorithm">Heap sort</li>
                                <li className="algorithm">Selection sort</li>
                                <li className="algorithm">Bubble sort</li>
                                <li className="algorithm">Insertion sort</li>
                                <li className="algorithm">Shell sort</li>
                            </ul>
                        </div>
                    )}
                </div>
                <button type="button" className="btn">
                    Sort
                </button>
                <div
                    className={`nav-item ${showSpeed ? 'btn-active' : ''}`}
                    aria-hidden="true"
                    onClick={handleShowSpeed}
                    ref={speedRef}
                >
                    Speed
                    <span
                        className={`caret ${showSpeed ? 'caret-animations' : ''}`}
                    />
                    {showSpeed && (
                        <div className="dropdown-menu">
                            <ul className="list-algorithm">
                                <li className="algorithm">Slow</li>
                                <li className="algorithm">Normal</li>
                                <li className="algorithm">Medium</li>
                                <li className="algorithm">Fast</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar
