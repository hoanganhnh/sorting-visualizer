import React, { useState } from 'react'

import { useClickOutside } from '../hooks'
import ChartIcon from '../assets/img/chart.svg'

import './NavBar.css'

function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSpeed, setShowSpeed] = useState(false)
    const [value, setValue] = useState(10)

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
            <div className="container">
                <h1 className="logo-container">
                    <img className="chart-icon" src={ChartIcon} alt="ChartIcon" />
                    Sorting Visualizer
                </h1>
                <div className="nav-content">
                    <div className="nav-item">Reset Array</div>
                    <div className="nav-item">
                        Size
                        <input
                            type="range"
                            value={value}
                            min="5"
                            max="100"
                            step="1"
                            name="aize-array"
                            id="size-array"
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div
                        className={`nav-item ${showDropdown ? 'btn-active' : ''}`}
                        aria-hidden="true"
                        onClick={handleShowDropdown}
                        ref={dropdownRef}
                    >
                        Algorithms
                        <span
                            className={`caret ${
                                showDropdown ? 'caret-animations' : ''
                            }`}
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
                            className={`caret ${
                                showSpeed ? 'caret-animations' : ''
                            }`}
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
        </div>
    )
}

export default NavBar
