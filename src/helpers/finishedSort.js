import { PRIMARY_COLOR } from '../constants'
import changeColorAnimation from './changeColorAnimation'

export default async function finishedSort(bars, ms) {
    for (let k = 0; k < bars.length; k++) {
        await changeColorAnimation(bars, k, PRIMARY_COLOR, ms)
    }
}
