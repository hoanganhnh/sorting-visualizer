import React, { useEffect, useState } from 'react'

import './SortingVisualier.css'
// import getMergeSortAnimations from '../algorithms/MergeSortAnimations'

const TIME_SPEED = 50

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise'

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#d61d1dcc'

const THIRST_COLOR = 'rgb(49, 226, 13)'

const CORLOR_RUN = 'rgb(80, 80, 174)'

const YELLOW_COLOR = 'yellow'
const ORANGE_COLOR = 'orange'
const PINK_COLOR = 'pink'

const COUNT_RANGE = 20

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

function swapHeightNormal(arr, i, j) {
    const temp = arr[i].style.height
    arr[i].style.height = arr[j].style.height
    arr[j].style.height = temp
}

function swapContentNormal(arr, i, j) {
    const temp = arr[i].children[0].innerText
    arr[i].children[0].innerText = arr[j].children[0].innerText
    arr[j].children[0].innerText = temp
}

async function changeColorAnimation(arr, i, color, ms = TIME_SPEED) {
    arr[i].style.backgroundColor = color
    await sleep(ms)
}

function getValueBar(arr, i) {
    const heightString = arr[i].style.height
    /**
     * @NOTE: slice "px"
     */
    const heightConvert = heightString.slice(0, heightString.length - 2)
    return Number(heightConvert)
}

function isArraySorted(arr) {
    if (!arr.length) return false
    for (let i = 0; i < arr.length - 1; i++) {
        const x = getValueBar(arr, i)
        const y = getValueBar(arr, i + 1)
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
    const poviotValues = getValueBar(arr, end)
    let i = start - 1
    arr[end].style.backgroundColor = SECONDARY_COLOR

    for (let j = start; j < end; j++) {
        const currentBar = getValueBar(arr, j)

        // await changeColorAnimation(arr, j, YELLOW_COLOR, 50)
        arr[j].style.backgroundColor = YELLOW_COLOR
        await sleep(TIME_SPEED)

        if (currentBar <= poviotValues) {
            i++

            swapHeightNormal(arr, i, j)
            swapContentNormal(arr, i, j)
            arr[i].style.backgroundColor = ORANGE_COLOR

            if (i !== j) {
                // await changeColorAnimation(arr, j, PINK_COLOR, 50)
                arr[j].style.backgroundColor = ORANGE_COLOR
            }
            // await changeColorAnimation(arr, i, ORANGE_COLOR, 50)
            await sleep(TIME_SPEED)
        } else {
            // await changeColorAnimation(arr, j, PINK_COLOR, 50)
            arr[j].style.backgroundColor = PINK_COLOR
        }
    }
    await sleep(TIME_SPEED)

    swapHeightNormal(arr, i + 1, end)
    swapContentNormal(arr, i + 1, end)

    arr[end].style.background = PINK_COLOR
    arr[i + 1].style.background = THIRST_COLOR

    await sleep(TIME_SPEED)

    for (let k = 0; k < arr.length; k++) {
        // await changeColorAnimation(arr, k, THIRST_COLOR, 25)
        if (arr[k].style.background !== THIRST_COLOR) {
            arr[k].style.background = PRIMARY_COLOR
        }
    }

    return i + 1
}
const DELAY_TIME = 100

const doMerge = async (arr, start, middleIndex, end) => {
    const n1 = middleIndex - start + 1
    const n2 = end - middleIndex

    const L = []
    const R = []

    for (let i = 0; i < n1; i++) {
        await sleep(DELAY_TIME)
        arr[start + i].style.backgroundColor = ORANGE_COLOR
        L[i] = arr[start + i].style.height
    }

    for (let i = 0; i < n2; i++) {
        await sleep(DELAY_TIME)
        arr[middleIndex + 1 + i].style.backgroundColor = YELLOW_COLOR
        R[i] = arr[middleIndex + 1 + i].style.height
    }

    let i = 0
    let j = 0
    let k = start

    while (i < n1 && j < n2) {
        if (parseInt(L[i], 10) <= parseInt(R[j], 10)) {
            await sleep(DELAY_TIME)
            if (n1 + n2 === arr.length) {
                arr[k].style.backgroundColor = THIRST_COLOR
            } else {
                arr[k].style.backgroundColor = PINK_COLOR
            }
            arr[k].style.height = L[i]
            arr[k].children[0].innerText = parseInt(L[i], 10)
            i++
        } else {
            if (n1 + n2 === arr.length) {
                arr[k].style.backgroundColor = THIRST_COLOR
            } else {
                arr[k].style.backgroundColor = PINK_COLOR
            }
            arr[k].style.height = R[j]
            arr[k].children[0].innerText = parseInt(R[j], 10)
            j++
        }
        k++
    }

    while (i < n1) {
        await sleep(DELAY_TIME)
        if (n1 + n2 === arr.length) {
            arr[k].style.backgroundColor = THIRST_COLOR
        } else {
            arr[k].style.backgroundColor = PINK_COLOR
        }
        arr[k].style.height = L[i]
        arr[k].children[0].innerText = parseInt(L[i], 10)
        i++
        k++
    }

    while (j < n2) {
        await sleep(DELAY_TIME)
        if (n1 + n2 === arr.length) {
            arr[k].style.backgroundColor = THIRST_COLOR
        } else {
            arr[k].style.backgroundColor = PINK_COLOR
        }
        arr[k].style.height = R[j]
        arr[k].children[0].innerText = parseInt(R[j], 10)
        j++
        k++
    }
}

function SortingVisualier() {
    const [currentArray, setCurrentArray] = useState([])

    const quickSort = async (arr, start, end) => {
        if (start < end) {
            const position = await partition(arr, start, end)
            await Promise.all([
                quickSort(arr, start, position - 1),
                quickSort(arr, position + 1, end),
            ])
        } else if (
            start >= 0 &&
            end >= 0 &&
            start < arr.length &&
            end < arr.length
        ) {
            arr[end].style.background = THIRST_COLOR
            arr[start].style.background = THIRST_COLOR
        }
        /*  if (isArraySorted(arr)) {
            for (let k = 0; k < arr.length; k++) {
                await changeColorAnimation(arr, k, PRIMARY_COLOR, 50)
            }
        } */
    }

    const mergeSort = async (arr, start, end) => {
        if (start < end) {
            const middleIndex = start + Math.floor((end - start) / 2)

            await mergeSort(arr, start, middleIndex)
            await mergeSort(arr, middleIndex + 1, end)
            await doMerge(arr, start, middleIndex, end)
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

                const val1 = getValueBar(bars, j)
                const val2 = getValueBar(bars, minIndex)

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
                const x = getValueBar(bars, j)
                const y = getValueBar(bars, j + 1)
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
            const key = getValueBar(bars, i)

            const heightElement = bars[i].style.height
            let j = i - 1

            await changeColorAnimation(bars, i, CORLOR_RUN)

            while (j >= 0 && getValueBar(bars, j) > key) {
                // bars[j].style.backgroundColor = 'darkblue'
                await changeColorAnimation(bars, j, CORLOR_RUN, 100)

                bars[j + 1].children[0].innerText = getValueBar(bars, j)
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
                for (let k = i; k >= 0; k--) {
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

        if (l < n && getValueBar(arr, l) > getValueBar(arr, largest)) {
            largest = l
        }

        if (r < n && getValueBar(arr, r) > getValueBar(arr, largest)) {
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

    const heapSort = async () => {
        const arr = document.querySelectorAll('.bar')
        const n = arr.length

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

    const shellSort = async () => {
        const bars = document.querySelectorAll('.bar')

        const size = bars.length

        for (let i = Math.floor(size / 2); i > 0; i = Math.floor(i / 2)) {
            for (let j = i; j < size; j++) {
                const temp = getValueBar(bars, j)
                let k
                const temp1 = bars[j].style.height
                const temp2 = getValueBar(bars, j)

                await changeColorAnimation(bars, j, CORLOR_RUN, 100)

                for (k = j; k >= i && getValueBar(bars, k - i) > temp; k -= i) {
                    bars[k].style.height = bars[k - i].style.height

                    bars[k].childNodes[0].innerText =
                        bars[k - i].childNodes[0].innerText
                    await changeColorAnimation(bars, k, ORANGE_COLOR, 100)
                }
                bars[j].style.backgroundColor = PINK_COLOR
                // await changeColorAnimation(bars, j, PINK_COLOR, 100)
                // await changeColorAnimation(bars, k, PINK_COLOR, 100)

                bars[k].style.height = temp1
                bars[k].childNodes[0].innerText = temp2

                // bars[j].style.backgroundColor = 'rgb(0, 183, 255)'
                // bars[k].style.backgroundColor = 'rgb(0, 183, 255)'

                await Promise.all([
                    changeColorAnimation(bars, j, PINK_COLOR, 50),
                    changeColorAnimation(bars, k, PRIMARY_COLOR, 50),
                ])
            }
        }
        for (let x = 0; x < size; x++) {
            // bars[x].style.backgroundColor = THIRST_COLOR
            await changeColorAnimation(bars, x, THIRST_COLOR, 50)
        }
        await finishedSort(bars, 100)
    }

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
            <button type="button" onClick={heapSort}>
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
            <button type="button" onClick={shellSort}>
                Shell sort
            </button>
        </>
    )
}

export default SortingVisualier
