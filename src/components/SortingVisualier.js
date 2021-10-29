import React, { useEffect, useState } from 'react'

import { randomIntFromInterval } from '../helpers'
import { PRIMARY_COLOR, COUNT_RANGE } from '../constants'
import './SortingVisualier.css'

function SortingVisualier() {
    const [currentArray, setCurrentArray] = useState([])

    const resetArray = () => {
        const array = []
        for (let i = 0; i < COUNT_RANGE; i++) {
            array.push(randomIntFromInterval(20, 400))
        }
        setCurrentArray(array)
        const arr = document.querySelectorAll('.bar')
        for (let k = 0; k < arr.length; k++) {
            arr[k].style.backgroundColor = PRIMARY_COLOR
        }
    }

    useEffect(() => {
        resetArray()
    }, [])

    return (
        <>
            <div className="data-container">
                {currentArray.map((value, index) => (
                    <div
                        className="bar"
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                            margin: '0 0 0 2px',
                        }}
                    >
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            <button type="button" onClick={resetArray}>
                Create New Array
            </button>
        </>
    )
}

export default SortingVisualier
