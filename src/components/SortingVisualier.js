import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { PRIMARY_COLOR } from '../constants'
import { setCurrentArraySelector } from '../redux/slices/setCurrentArray'
import './SortingVisualier.css'

function SortingVisualier() {
    const amountArray = useSelector(setCurrentArraySelector)
    const [currentArray, setCurrentArray] = useState(amountArray)

    useEffect(() => {
        setCurrentArray(amountArray)
    }, [amountArray])

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
        </>
    )
}

export default SortingVisualier
