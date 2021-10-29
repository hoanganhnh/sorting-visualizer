import { TIME_SPEED } from '../constants'
import sleep from './sleep'

export default async function swapContent(arr, i, j, ms = TIME_SPEED) {
    const temp = arr[i].children[0].innerText
    arr[i].children[0].innerText = arr[j].children[0].innerText
    arr[j].children[0].innerText = temp
    await sleep(ms)
}
