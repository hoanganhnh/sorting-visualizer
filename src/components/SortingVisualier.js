import React from 'react'
import { useSelector } from 'react-redux'

import { PRIMARY_COLOR } from '../constants'
import { setCurrentArraySelector } from '../redux/slices/setCurrentArray'
import './SortingVisualier.css'

function SortingVisualier() {
    const amountArray = useSelector(setCurrentArraySelector)

    const numWidth = Math.floor(document.body.clientWidth / (amountArray.length * 3))
    const width = `${numWidth * 2}px`
    const color = numWidth > 20 ? 'white' : 'transparent'

    return (
        <>
            <div className="data-container">
                {amountArray.map((value, index) => (
                    <div
                        className="bar"
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                            margin: '0 0 0 2px',
                            width,
                        }}
                    >
                        <span style={{ color }}>{value}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SortingVisualier
