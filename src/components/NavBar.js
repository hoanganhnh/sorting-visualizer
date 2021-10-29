import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

import {
    PRIMARY_COLOR,
    QUICK_SORT,
    HEAP_SORT,
    SELECT_SORT,
    BUBBLE_SORT,
    MERGED_SORT,
    INSERT_SORT,
    SHELL_SORT,
    LIST_ALGORITHM,
    SPEED_SLOW,
    SPEED_NORMAL,
    SPEED_MEDIUM,
    SPEED_FAST,
    SPEED_SUPER_FAST,
    SPEEDS,
    TIME_SPEED_SLOW,
    TIME_SPEED_NORMAL,
    TIME_SPEED_MEDIUM,
    TIME_SPEED_FAST,
    TIME_SPEED_SUPER_FAST,
} from '../constants'
import { randomIntFromInterval } from '../helpers'
import { updateArray } from '../redux/slices/setCurrentArray'
import {
    updateTime,
    setCurrentTimeSpeedSelector,
} from '../redux/slices/setCurrentTimeSpeed'
import './NavBar.css'

function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSpeed, setShowSpeed] = useState(false)
    const [disable, setDisable] = useState(false)
    const [value, setValue] = useState(10)
    const [typeAlgorithm, setTypeAlgorithm] = useState('')
    const [typeSpeed, setTypeSpeed] = useState('')

    const currentTimeSpeed = useSelector(setCurrentTimeSpeedSelector)

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
    const handleChooseSpeed = (type) => {
        if (type === SPEED_SLOW) {
            setTypeSpeed(SPEED_SLOW)
            dispatch(updateTime(TIME_SPEED_SLOW))
        }
        if (type === SPEED_NORMAL) {
            setTypeSpeed(SPEED_NORMAL)
            dispatch(updateTime(TIME_SPEED_NORMAL))
        }
        if (type === SPEED_MEDIUM) {
            setTypeSpeed(SPEED_MEDIUM)
            dispatch(updateTime(TIME_SPEED_MEDIUM))
        }
        if (type === SPEED_FAST) {
            setTypeSpeed(SPEED_FAST)
            dispatch(updateTime(TIME_SPEED_FAST))
        }
        if (type === SPEED_SUPER_FAST) {
            setTypeSpeed(SPEED_SUPER_FAST)
            dispatch(updateTime(TIME_SPEED_SUPER_FAST))
        }
    }
    const onResetColorBar = () => {
        const arr = document.querySelectorAll('.bar')
        for (let k = 0; k < arr.length; k++) {
            arr[k].style.backgroundColor = PRIMARY_COLOR
        }
    }
    const initCurrentBars = () => {
        const array = []
        for (let i = 0; i < Number(value) * 2; i++) {
            array.push(
                randomIntFromInterval(
                    20,
                    Math.floor(document.body.clientHeight / 1.2),
                ),
            )
        }
        return array
    }
    const actionSort = async (type) => {
        onResetColorBar()
        if (!typeSpeed) return
        const bars = document.querySelectorAll('.bar')
        const size = bars.length
        if (type === INSERT_SORT) {
            setDisable(true)
            await insertionSort(currentTimeSpeed)
            setDisable(false)
        }
        if (type === SELECT_SORT) {
            setDisable(true)
            await selectionSort(currentTimeSpeed)
            setDisable(false)
        }
        if (type === SHELL_SORT) {
            setDisable(true)
            await shellSort(currentTimeSpeed)
            setDisable(false)
        }
        if (type === HEAP_SORT) {
            setDisable(true)
            await heapSort(currentTimeSpeed)
            setDisable(false)
        }
        if (type === BUBBLE_SORT) {
            setDisable(true)
            await bubbleSort(currentTimeSpeed)
            setDisable(false)
        }
        if (type === QUICK_SORT) {
            setDisable(true)
            await quickSort(bars, 0, size - 1, currentTimeSpeed)
            setDisable(false)
        }
        if (type === MERGED_SORT) {
            setDisable(true)
            await mergeSort(bars, 0, size - 1, currentTimeSpeed)
            setDisable(false)
        }
    }
    const resetArray = () => {
        setTypeAlgorithm('')
        setTypeSpeed('')
        const array = initCurrentBars()
        dispatch(updateArray(array))
        const arr = document.querySelectorAll('.bar')
        for (let k = 0; k < arr.length; k++) {
            arr[k].style.backgroundColor = PRIMARY_COLOR
        }
    }
    useClickOutside(dropdownRef, () => setShowDropdown(false))
    useClickOutside(speedRef, () => setShowSpeed(false))

    useEffect(() => {
        const array = initCurrentBars()
        onResetColorBar()
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
                        className={`nav-item ${disable ? 'disable' : ''}`}
                        aria-hidden="true"
                        onClick={resetArray}
                    >
                        Reset Array
                    </div>
                    <div className={`nav-item ${disable ? 'disable' : ''}`}>
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
                        className={`nav-item ${showDropdown ? 'btn-active' : ''} ${
                            disable ? 'disable' : ''
                        }`}
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
                        className={`btn ${disable ? 'btn-disabled' : ''}`}
                        onClick={() => actionSort(typeAlgorithm)}
                    >
                        Sort
                    </button>
                    <div
                        className={`nav-item ${showSpeed ? 'btn-active' : ''} ${
                            disable ? 'disable' : ''
                        }`}
                        aria-hidden="true"
                        onClick={handleShowSpeed}
                        ref={speedRef}
                    >
                        {!typeSpeed ? 'Speed' : typeSpeed}
                        <span
                            className={`caret ${
                                showSpeed ? 'caret-animations' : ''
                            }`}
                        />
                        {showSpeed && (
                            <div className="dropdown-menu">
                                <ul className="list-algorithm">
                                    {SPEEDS.map((speed) => (
                                        <li
                                            key={speed.id}
                                            className="algorithm"
                                            aria-hidden="true"
                                            onClick={() =>
                                                handleChooseSpeed(speed.type)
                                            }
                                        >
                                            {speed.type}
                                        </li>
                                    ))}
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
