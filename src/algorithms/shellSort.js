import {
    CORLOR_RUN,
    ORANGE_COLOR,
    PINK_COLOR,
    PRIMARY_COLOR,
    THIRST_COLOR,
} from '../constants'
import { changeColorAnimation, finishedSort, getValueBar } from '../helpers'

const shellSort = async (time) => {
    const bars = document.querySelectorAll('.bar')

    const size = bars.length

    for (let i = Math.floor(size / 2); i > 0; i = Math.floor(i / 2)) {
        for (let j = i; j < size; j++) {
            const temp = getValueBar(bars, j)
            let k
            const temp1 = bars[j].style.height
            const temp2 = getValueBar(bars, j)

            await changeColorAnimation(bars, j, CORLOR_RUN, time)

            for (k = j; k >= i && getValueBar(bars, k - i) > temp; k -= i) {
                bars[k].style.height = bars[k - i].style.height

                bars[k].childNodes[0].innerText = bars[k - i].childNodes[0].innerText
                await changeColorAnimation(bars, k, ORANGE_COLOR, time)
            }
            bars[j].style.backgroundColor = PINK_COLOR

            bars[k].style.height = temp1
            bars[k].childNodes[0].innerText = temp2

            await Promise.all([
                changeColorAnimation(bars, j, PINK_COLOR, time),
                changeColorAnimation(bars, k, PRIMARY_COLOR, time),
            ])
        }
    }
    for (let x = 0; x < size; x++) {
        await changeColorAnimation(bars, x, THIRST_COLOR, time)
    }
    await finishedSort(bars, 100)
}

export default shellSort
