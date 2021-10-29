import {
    CORLOR_RUN,
    ORANGE_COLOR,
    PINK_COLOR,
    PRIMARY_COLOR,
    THIRST_COLOR,
} from '../constants'
import { changeColorAnimation, finishedSort, getValueBar } from '../helpers'

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

                bars[k].childNodes[0].innerText = bars[k - i].childNodes[0].innerText
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

export default shellSort
