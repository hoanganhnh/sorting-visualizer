import React, { useEffect, useState } from 'react'

import './SortingVisualier.css'

const TIME_SPEED = 200

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise'

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#d61d1dcc'

const THIRST_COLOR = 'rgb(49, 226, 13)'

const CORLOR_RUN = 'rgb(80, 80, 174)'

const YELLOW_COLOR = 'yellow'
const ORANGE_COLOR = 'orange'
const PINK_COLOR = 'pink'

const COUNT_RANGE = 10

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * @fn
 * @TODO
 * @FIXME
 * @BUG
 * @OPTIMIZE
 * @NOTE
 * !Dangerous
 * ? question
 * * Important
 */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function swapHeight(arr, i, j) {
    const temp = arr[i].style.height
    arr[i].style.height = arr[j].style.height
    arr[j].style.height = temp
    await sleep(TIME_SPEED)
}

async function swapContent(arr, i, j) {
    const temp = arr[i].children[0].innerText
    arr[i].children[0].innerText = arr[j].children[0].innerText
    arr[j].children[0].innerText = temp
    await sleep(TIME_SPEED)
}

async function changeColorAnimation(arr, i, color, ms = TIME_SPEED) {
    arr[i].style.backgroundColor = color
    await sleep(ms)
}

function getInnerContent(arr, i) {
    return Number(arr[i].children[0].innerText) || arr[i].childNodes[0].innerHTML
}

function isArraySorted(arr) {
    if (!arr.length) return false
    for (let i = 0; i < arr.length - 1; i++) {
        const x = Number(arr[i].children[0].innerText)
        const y = Number(arr[i + 1].children[0].innerText)
        if (x > y) {
            return false
        }
    }
    return true
}

async function finishedSort(bars, ms) {
    for (let k = 0; k < bars.length; k++) {
        await changeColorAnimation(bars, k, PRIMARY_COLOR, ms)
    }
}

const partition = async (arr, start, end) => {
    const poviotValues = getInnerContent(arr, end)
    let i = start - 1
    await changeColorAnimation(arr, end, CORLOR_RUN)

    for (let j = start; j < end; j++) {
        const currentBar = getInnerContent(arr, j)

        await changeColorAnimation(arr, j, YELLOW_COLOR)

        if (currentBar <= poviotValues) {
            i++
            await Promise.all([swapHeight(arr, i, j), swapContent(arr, i, j)])
            await changeColorAnimation(arr, i, ORANGE_COLOR)

            if (i !== j) {
                await changeColorAnimation(arr, j, PINK_COLOR)
            }
        } else {
            await changeColorAnimation(arr, j, PINK_COLOR)
        }
    }
    await Promise.all([swapHeight(arr, i + 1, end), swapContent(arr, i + 1, end)])

    for (let k = 0; k < COUNT_RANGE; k++) {
        await changeColorAnimation(arr, k, THIRST_COLOR)
    }

    return i + 1
}

function SortingVisualier() {
    const [currentArray, setCurrentArray] = useState([])

    const quickSort = async (arr, start, end) => {
        if (isArraySorted(arr)) {
            for (let k = 0; k < arr.length; k++) {
                await changeColorAnimation(arr, k, PRIMARY_COLOR, 100)
            }
        }
        if (start < end) {
            const position = await partition(arr, start, end)
            await Promise.all([
                quickSort(arr, start, position - 1),
                quickSort(arr, position + 1, end),
            ])
        }
    }

    const selectionSort = async () => {
        const bars = document.querySelectorAll('.bar')
        let minIndex = 0

        for (let i = 0; i < bars.length; i++) {
            minIndex = i
            await changeColorAnimation(bars, i, CORLOR_RUN)

            for (let j = i + 1; j < bars.length; j++) {
                await changeColorAnimation(bars, j, SECONDARY_COLOR)

                const val1 = getInnerContent(bars, j)
                const val2 = getInnerContent(bars, minIndex)

                if (val1 < val2) {
                    if (minIndex !== i) {
                        await changeColorAnimation(bars, minIndex, PRIMARY_COLOR)
                    }
                    minIndex = j
                } else {
                    await changeColorAnimation(bars, j, PRIMARY_COLOR)
                }
            }

            await Promise.all([
                swapHeight(bars, minIndex, i),
                swapContent(bars, minIndex, i),
                changeColorAnimation(bars, minIndex, PRIMARY_COLOR),
                changeColorAnimation(bars, i, THIRST_COLOR),
            ])
        }
        await finishedSort(bars, 100)
    }

    const bubbleSort = async () => {
        const bars = document.querySelectorAll('.bar')

        for (let i = 0; i < bars.length - 1; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                const x = getInnerContent(bars, j)
                const y = getInnerContent(bars, j + 1)
                await Promise.all([
                    await changeColorAnimation(bars, j, CORLOR_RUN),
                    await changeColorAnimation(bars, j + 1, CORLOR_RUN),
                ])
                if (y < x) {
                    await Promise.all([
                        swapHeight(bars, j, j + 1),
                        swapContent(bars, j, j + 1),
                    ])
                }
                await Promise.all([
                    await changeColorAnimation(bars, j, PINK_COLOR),
                    await changeColorAnimation(bars, j + 1, PINK_COLOR),
                ])
            }
            await changeColorAnimation(bars, bars.length - i - 1, THIRST_COLOR)
            if (bars.length - i - 1 === 1) {
                await changeColorAnimation(bars, 0, THIRST_COLOR)
            }
        }
        await finishedSort(bars, 100)
    }

    const insertionSort = async () => {
        const bars = document.querySelectorAll('.bar')

        await changeColorAnimation(bars, 0, THIRST_COLOR)

        for (let i = 1; i < bars.length; i++) {
            const key = getInnerContent(bars, i)

            const heightElement = bars[i].style.height
            let j = i - 1

            await changeColorAnimation(bars, i, CORLOR_RUN)

            while (j >= 0 && getInnerContent(bars, j) > key) {
                bars[j].style.backgroundColor = 'darkblue'
                // await changeColorAnimation(bars, j, CORLOR_RUN)

                bars[j + 1].children[0].innerText = getInnerContent(bars, j)
                bars[j + 1].style.height = bars[j].style.height

                j -= 1

                for (let k = i; k >= 0; k--) {
                    bars[k].style.backgroundColor = PINK_COLOR
                }
            }

            bars[j + 1].style.height = heightElement
            bars[j + 1].childNodes[0].innerHTML = key

            // await sleep(500)
            // bars[i].style.backgroundColor = ' rgb(49, 226, 13)'
            await changeColorAnimation(bars, i, THIRST_COLOR)
            if (i === bars.length - 1) {
                for (let k = 0; k <= i; k++) {
                    // bars[k].style.backgroundColor = THIRST_COLOR
                    await changeColorAnimation(bars, k, THIRST_COLOR, 100)
                }
            }
        }
        await finishedSort(bars, 100)
    }

    const resetArray = () => {
        const array = []
        for (let i = 0; i < COUNT_RANGE; i++) {
            array.push(randomIntFromInterval(20, 400))
        }
        setCurrentArray(array)
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
            <button
                type="button"
                onClick={() =>
                    quickSort(
                        document.querySelectorAll('.bar'),
                        0,
                        document.querySelectorAll('.bar').length - 1,
                    )
                }
            >
                Quick Sort
            </button>
            <button type="button" onClick={selectionSort}>
                Selection sort
            </button>
            <button type="button" onClick={bubbleSort}>
                Bubble sort
            </button>
            <button type="button" onClick={insertionSort}>
                Insertion sort
            </button>
        </>
    )
}

export default SortingVisualier
