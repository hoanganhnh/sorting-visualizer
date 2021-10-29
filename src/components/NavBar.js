import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useClickOutside } from '../hooks'
import ChartIcon from '../assets/img/chart.svg'
import {
    insertionSort,
    bubbleSort,
    heapSort,
    shellSort,
    selectionSort,
    quickSort,
    mergeSort,
} from '../algorithms'

import './NavBar.css'
import { PRIMARY_COLOR } from '../constants'
import { randomIntFromInterval } from '../helpers'
import { updateArray } from '../redux/slices/setCurrentArray'

const QUICK_SORT = 'Quick Sort'
const HEAP_SORT = 'Heap Sort'
const SELECT_SORT = 'Select Sort'
const BUBBLE_SORT = 'Bubble Sort'
const MERGED_SORT = 'Merged Sort'
const INSERT_SORT = 'Insert Sort'
const SHELL_SORT = 'Shell Sort'
const LIST_ALGORITHM = [
    {
        id: 1,
        type: QUICK_SORT,
    },
    {
        id: 2,
        type: MERGED_SORT,
    },
    {
        id: 3,
        type: SELECT_SORT,
    },
    {
        id: 4,
        type: BUBBLE_SORT,
    },
    {
        id: 5,
        type: HEAP_SORT,
    },
    {
        id: 6,
        type: INSERT_SORT,
    },
    {
        id: 7,
        type: SHELL_SORT,
    },
]

function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSpeed, setShowSpeed] = useState(false)
    const [value, setValue] = useState(10)
    const [typeAlgorithm, setTypeAlgorithm] = useState('')

    const dispatch = useDispatch()

    const dropdownRef = React.useRef()
    const speedRef = React.useRef()

    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }
    const handleShowSpeed = () => {
        setShowSpeed(!showSpeed)
    }
    const handleChooseAlgorithm = (type) => {
        if (type === QUICK_SORT) {
            setTypeAlgorithm(QUICK_SORT)
        }
        if (type === MERGED_SORT) {
            setTypeAlgorithm(MERGED_SORT)
        }
        if (type === BUBBLE_SORT) {
            setTypeAlgorithm(BUBBLE_SORT)
        }
        if (type === HEAP_SORT) {
            setTypeAlgorithm(HEAP_SORT)
        }
        if (type === INSERT_SORT) {
            setTypeAlgorithm(INSERT_SORT)
        }
        if (type === SELECT_SORT) {
            setTypeAlgorithm(SELECT_SORT)
        }
        if (type === SHELL_SORT) {
            setTypeAlgorithm(SHELL_SORT)
        }
    }
    const actionSort = async (type) => {
        const bars = document.querySelectorAll('.bar')
        const size = bars.length
        if (type === INSERT_SORT) {
            insertionSort()
        }
        if (type === SELECT_SORT) {
            selectionSort()
        }
        if (type === SHELL_SORT) {
            shellSort()
        }
        if (type === HEAP_SORT) {
            heapSort()
        }
        if (type === BUBBLE_SORT) {
            bubbleSort()
        }
        if (type === QUICK_SORT) {
            quickSort(bars, 0, size - 1)
        }
        if (type === MERGED_SORT) {
            mergeSort(bars, 0, size - 1)
        }
        return undefined
    }
    const resetArray = () => {
        setTypeAlgorithm('')
        const array = []
        for (let i = 0; i < Number(value) * 2; i++) {
            array.push(randomIntFromInterval(20, 500))
        }
        dispatch(updateArray(array))
        const arr = document.querySelectorAll('.bar')
        for (let k = 0; k < arr.length; k++) {
            arr[k].style.backgroundColor = PRIMARY_COLOR
        }
    }
    useClickOutside(dropdownRef, () => setShowDropdown(false))
    useClickOutside(speedRef, () => setShowSpeed(false))

    useEffect(() => {
        const array = []
        for (let i = 0; i < Number(value) * 2; i++) {
            array.push(randomIntFromInterval(20, 500))
        }
        const arr = document.querySelectorAll('.bar')
        for (let k = 0; k < arr.length; k++) {
            arr[k].style.backgroundColor = PRIMARY_COLOR
        }
        dispatch(updateArray(array))
    }, [value])
    return (
        <div className="nav-warraper">
            <div className="container">
                <h1 className="logo-container">
                    <img className="chart-icon" src={ChartIcon} alt="ChartIcon" />
                    Sorting Visualizer
                </h1>
                <div className="nav-content">
                    <div
                        className="nav-item"
                        aria-hidden="true"
                        onClick={resetArray}
                    >
                        Reset Array
                    </div>
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
                        {!typeAlgorithm ? 'Algorithms' : typeAlgorithm}
                        <span
                            className={`caret ${
                                showDropdown ? 'caret-animations' : ''
                            }`}
                        />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <ul className="list-algorithm">
                                    {LIST_ALGORITHM.map((algorithm) => (
                                        <li
                                            key={algorithm.id}
                                            className="algorithm"
                                            aria-hidden="true"
                                            onClick={() =>
                                                handleChooseAlgorithm(algorithm.type)
                                            }
                                        >
                                            {algorithm.type}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        disable="true"
                        className="btn"
                        onClick={() => actionSort(typeAlgorithm)}
                    >
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
