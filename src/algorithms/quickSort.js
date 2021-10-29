import {
    ORANGE_COLOR,
    PINK_COLOR,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    THIRST_COLOR,
    TIME_SPEED,
    YELLOW_COLOR,
} from '../constants'
import { getValueBar, sleep, swapContentNormal, swapHeightNormal } from '../helpers'

const partition = async (arr, start, end, time) => {
    const poviotValues = getValueBar(arr, end)
    let i = start - 1
    arr[end].style.backgroundColor = SECONDARY_COLOR

    for (let j = start; j < end; j++) {
        const currentBar = getValueBar(arr, j)

        arr[j].style.backgroundColor = YELLOW_COLOR
        await sleep(time || TIME_SPEED)

        if (currentBar <= poviotValues) {
            i++

            swapHeightNormal(arr, i, j)
            swapContentNormal(arr, i, j)
            arr[i].style.backgroundColor = ORANGE_COLOR

            if (i !== j) {
                arr[j].style.backgroundColor = ORANGE_COLOR
            }
            await sleep(time || TIME_SPEED)
        } else {
            arr[j].style.backgroundColor = PINK_COLOR
        }
    }
    await sleep(time || TIME_SPEED)

    swapHeightNormal(arr, i + 1, end)
    swapContentNormal(arr, i + 1, end)

    arr[end].style.background = PINK_COLOR
    arr[i + 1].style.background = THIRST_COLOR

    await sleep(time || TIME_SPEED)

    for (let k = 0; k < arr.length; k++) {
        if (arr[k].style.background !== THIRST_COLOR) {
            arr[k].style.background = PRIMARY_COLOR
        }
    }

    return i + 1
}

const quickSort = async (arr, start, end, time) => {
    if (start < end) {
        const position = await partition(arr, start, end, time)
        await Promise.all([
            quickSort(arr, start, position - 1, time),
            quickSort(arr, position + 1, end, time),
        ])
    } else if (start >= 0 && end >= 0 && start < arr.length && end < arr.length) {
        arr[end].style.background = THIRST_COLOR
        arr[start].style.background = THIRST_COLOR
    }
}

export default quickSort
