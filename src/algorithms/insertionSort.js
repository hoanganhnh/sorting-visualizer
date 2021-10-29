import { CORLOR_RUN, PINK_COLOR, THIRST_COLOR } from '../constants'
import { changeColorAnimation, finishedSort, getValueBar } from '../helpers'

const insertionSort = async (time) => {
    const bars = document.querySelectorAll('.bar')

    await changeColorAnimation(bars, 0, THIRST_COLOR, time)

    for (let i = 1; i < bars.length; i++) {
        const key = getValueBar(bars, i)

        const heightElement = bars[i].style.height
        let j = i - 1

        await changeColorAnimation(bars, i, CORLOR_RUN, time)

        while (j >= 0 && getValueBar(bars, j) > key) {
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

        await changeColorAnimation(bars, i, THIRST_COLOR, time)
        if (i === bars.length - 1) {
            for (let k = i; k >= 0; k--) {
                await changeColorAnimation(bars, k, THIRST_COLOR, time)
            }
        }
    }
    await finishedSort(bars, 100)
}

export default insertionSort
