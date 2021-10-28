export default function swapHeightNormal(arr, i, j) {
    const temp = arr[i].style.height
    arr[i].style.height = arr[j].style.height
    arr[j].style.height = temp
}
