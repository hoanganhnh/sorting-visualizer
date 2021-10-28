import { TIME_SPEED } from '../constants'
import sleep from './sleep'

export default async function swapHeight(arr, i, j) {
    const temp = arr[i].style.height
    arr[i].style.height = arr[j].style.height
    arr[j].style.height = temp
    await sleep(TIME_SPEED)
}
