import {
    ORANGE_COLOR,
    PINK_COLOR,
    THIRST_COLOR,
    TIME_SPEED,
    YELLOW_COLOR,
} from '../constants'
import { sleep } from '../helpers'

const doMerge = async (arr, start, middleIndex, end, time) => {
    const n1 = middleIndex - start + 1
    const n2 = end - middleIndex

    const L = []
    const R = []

    for (let i = 0; i < n1; i++) {
        await sleep(time || TIME_SPEED)
        arr[start + i].style.backgroundColor = ORANGE_COLOR
        L[i] = arr[start + i].style.height
    }

    for (let i = 0; i < n2; i++) {
        await sleep(time || TIME_SPEED)
        arr[middleIndex + 1 + i].style.backgroundColor = YELLOW_COLOR
        R[i] = arr[middleIndex + 1 + i].style.height
    }

    let i = 0
    let j = 0
    let k = start

    while (i < n1 && j < n2) {
        if (parseInt(L[i], 10) <= parseInt(R[j], 10)) {
            await sleep(time || TIME_SPEED)
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
        await sleep(time || TIME_SPEED)
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
        await sleep(time || TIME_SPEED)
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

const mergeSort = async (arr, start, end, time) => {
    if (start < end) {
        const middleIndex = start + Math.floor((end - start) / 2)

        await mergeSort(arr, start, middleIndex, time)
        await mergeSort(arr, middleIndex + 1, end, time)
        await doMerge(arr, start, middleIndex, end, time)
    }
}

export default mergeSort
