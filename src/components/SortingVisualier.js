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
    // await changeColorAnimation(arr, end, CORLOR_RUN)
    arr[end].style.backgroundColor = CORLOR_RUN

    for (let j = start; j < end; j++) {
        const currentBar = getInnerContent(arr, j)

        await changeColorAnimation(arr, j, YELLOW_COLOR, 50)

        if (currentBar <= poviotValues) {
            i++
            await Promise.all([swapHeight(arr, i, j), swapContent(arr, i, j)])
            await changeColorAnimation(arr, i, ORANGE_COLOR, 50)

            if (i !== j) {
                await changeColorAnimation(arr, j, PINK_COLOR, 50)
            }
        } else {
            await changeColorAnimation(arr, j, PINK_COLOR, 50)
        }
    }
    await Promise.all([swapHeight(arr, i + 1, end), swapContent(arr, i + 1, end)])

    for (let k = start; k <= end; k++) {
        await changeColorAnimation(arr, k, THIRST_COLOR, 50)
    }

    return i + 1
}
// @FIXME
const doMerge = (arr, start, middleIndex, end) => {
    const n1 = middleIndex - start + 1
    const n2 = end - middleIndex

    const L = []
    const R = []

    for (let i = 0; i < n1; i++) {
        L[i] = arr[start + i]
    }

    for (let i = 0; i < n2; i++) {
        R[i] = arr[middleIndex + 1 + i]
    }

    let i = 0
    let j = 0
    let k = start

    while (i < n1 && j < n2) {
        // const x = L[i].style.height
        // const y = R[j].style.height
        // const x = getInnerContent(L, i)
        // const y = getInnerContent(R, j)
        if (L[i].style.height <= R[j].style.height) {
            arr[k].style.height = L[i].style.height
            arr[k].children[0].innerText = getInnerContent(L, i)
            i++
        } else {
            arr[k].style.height = R[j].style.height
            arr[k].children[0].innerText = getInnerContent(R, j)
            j++
        }
        k++
        // if (L[i] <= R[j]) {
        //     arr[k] = L[i]
        //     i++
        // } else {
        //     arr[k] = R[j]
        //     j++
        // }
        // k++
    }

    while (i < n1) {
        arr[k].style.height = L[i].style.height
        arr[k].children[0].innerText = getInnerContent(L, i)
        // arr[k] = L[i]
        i++
        k++
    }

    while (j < n2) {
        arr[k].style.height = R[j].style.height
        arr[k].children[0].innerText = getInnerContent(R, j)
        // arr[k] = R[j]
        j++
        k++
    }
}

function SortingVisualier() {
    const [currentArray, setCurrentArray] = useState([])

    const quickSort = async (arr, start, end) => {
        if (isArraySorted(arr)) {
            for (let k = 0; k < arr.length; k++) {
                await changeColorAnimation(arr, k, PRIMARY_COLOR, 50)
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

    // @FIXME
    const mergeSort = (arr, start, end) => {
        if (start < end) {
            const middleIndex = Math.floor(start + (end - start) / 2)

            mergeSort(arr, start, middleIndex)
            mergeSort(arr, middleIndex + 1, end)
            doMerge(arr, start, middleIndex, end)
        }
    }

    const selectionSort = async () => {
        const bars = document.querySelectorAll('.bar')
        let minIndex = 0

        for (let i = 0; i < bars.length; i++) {
            minIndex = i
            await changeColorAnimation(bars, i, CORLOR_RUN)

            for (let j = i + 1; j < bars.length; j++) {
                await changeColorAnimation(bars, j, SECONDARY_COLOR, 100)

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
                    changeColorAnimation(bars, j, CORLOR_RUN),
                    changeColorAnimation(bars, j + 1, CORLOR_RUN),
                ])
                if (y < x) {
                    await Promise.all([
                        swapHeight(bars, j, j + 1),
                        swapContent(bars, j, j + 1),
                    ])
                }
                await Promise.all([
                    changeColorAnimation(bars, j, PINK_COLOR),
                    changeColorAnimation(bars, j + 1, PINK_COLOR),
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
                // bars[j].style.backgroundColor = 'darkblue'
                await changeColorAnimation(bars, j, CORLOR_RUN, 100)

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

    const heapify = async (arr, n, i) => {
        let largest = i
        const l = 2 * i + 1
        const r = 2 * i + 2

        if (
            l < n &&
            Number(arr[l].childNodes[0].innerHTML) >
                Number(arr[largest].childNodes[0].innerHTML)
        ) {
            largest = l
        }

        if (
            r < n &&
            Number(arr[r].childNodes[0].innerHTML) >
                Number(arr[largest].childNodes[0].innerHTML)
        ) {
            largest = r
        }

        if (largest !== i) {
            await Promise.all([
                changeColorAnimation(arr, i, ORANGE_COLOR),
                swapHeight(arr, i, largest),
                swapContent(arr, i, largest),
                heapify(arr, n, largest),
            ])
        }

        arr[largest].style.backgroundColor = SECONDARY_COLOR
    }

    const heapSort = async (arr, n) => {
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await changeColorAnimation(arr, i, PINK_COLOR)
            await Promise.all([heapify(arr, n, i)])
        }

        for (let i = n - 1; i > 0; i--) {
            await changeColorAnimation(arr, i, THIRST_COLOR, 200)
            await Promise.all([
                swapHeight(arr, 0, i),
                swapContent(arr, 0, i),
                heapify(arr, i, 0),
            ])
        }
        arr[0].style.backgroundColor = THIRST_COLOR
        await finishedSort(arr, 100)
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
            <button
                type="button"
                onClick={() =>
                    mergeSort(
                        document.querySelectorAll('.bar'),
                        0,
                        document.querySelectorAll('.bar').length - 1,
                    )
                }
            >
                Merge sort
            </button>
            <button
                type="button"
                onClick={() =>
                    heapSort(
                        document.querySelectorAll('.bar'),
                        document.querySelectorAll('.bar').length,
                    )
                }
            >
                Heap sort
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
