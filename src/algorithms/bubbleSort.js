import { CORLOR_RUN, PINK_COLOR, THIRST_COLOR } from '../constants'
import {
    changeColorAnimation,
    finishedSort,
    getValueBar,
    swapContent,
    swapHeight,
} from '../helpers'

const bubbleSort = async (time) => {
    const bars = document.querySelectorAll('.bar')

    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            const x = getValueBar(bars, j)
            const y = getValueBar(bars, j + 1)
            await Promise.all([
                changeColorAnimation(bars, j, CORLOR_RUN, time),
                changeColorAnimation(bars, j + 1, CORLOR_RUN, time),
            ])
            if (y < x) {
                await Promise.all([
                    swapHeight(bars, j, j + 1, time),
                    swapContent(bars, j, j + 1, time),
                ])
            }
            await Promise.all([
                changeColorAnimation(bars, j, PINK_COLOR, time),
                changeColorAnimation(bars, j + 1, PINK_COLOR, time),
            ])
        }
        await changeColorAnimation(bars, bars.length - i - 1, THIRST_COLOR, time)
        if (bars.length - i - 1 === 1) {
            await changeColorAnimation(bars, 0, THIRST_COLOR, time)
        }
    }
    await finishedSort(bars, 100)
}
export default bubbleSort
