export default function getValueBar(arr, i) {
    const heightString = arr[i].style.height
    /**
     * @NOTE: slice "px"
     */
    const heightConvert = heightString.slice(0, heightString.length - 2)
    return Number(heightConvert)
}
