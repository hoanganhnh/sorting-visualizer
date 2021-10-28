import getValueBar from './getValueBar'

export default function isArraySorted(arr) {
    if (!arr.length) return false
    for (let i = 0; i < arr.length - 1; i++) {
        const x = getValueBar(arr, i)
        const y = getValueBar(arr, i + 1)
        if (x > y) {
            return false
        }
    }
    return true
}
