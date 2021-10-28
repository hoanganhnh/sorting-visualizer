import sleep from './sleep'
import { TIME_SPEED } from '../constants'

export default async function changeColorAnimation(arr, i, color, ms = TIME_SPEED) {
    arr[i].style.backgroundColor = color
    await sleep(ms)
}
