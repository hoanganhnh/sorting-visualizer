import {
    CORLOR_RUN,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    THIRST_COLOR,
} from '../constants'
import {
    changeColorAnimation,
    finishedSort,
    getValueBar,
    swapContent,
    swapHeight,
} from '../helpers'

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

export default selectionSort
