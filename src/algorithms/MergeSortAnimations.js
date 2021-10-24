function doMergeSort(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    let k = startIndex
    let i = startIndex
    let j = middleIndex + 1

    while (i <= middleIndex && j <= endIndex) {
        animations.push([i, j])
        animations.push([i, j])

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]])
            mainArray[k++] = auxiliaryArray[i++]
        } else {
            animations.push([k, auxiliaryArray[j]])
            mainArray[k++] = auxiliaryArray[j++]
        }
    }

    while (i <= middleIndex) {
        animations.push([i, i])
        animations.push([i, i])

        animations.push([k, auxiliaryArray[i]])
        mainArray[k++] = auxiliaryArray[i++]
    }

    while (j <= endIndex) {
        animations.push([j, j])
        animations.push([j, j])

        animations.push([k, auxiliaryArray[j]])
        mainArray[k++] = auxiliaryArray[j++]
    }
}

function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    if (startIndex === endIndex) return
    const middleIndex = Math.floor((startIndex + endIndex) / 2)
    mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations)
    mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations)
    doMergeSort(
        mainArray,
        startIndex,
        middleIndex,
        endIndex,
        auxiliaryArray,
        animations,
    )
}

export default function mergeSortAnimation(array) {
    const animations = []
    if (array.length <= 1) return array
    const auxiliaryArray = array.slice()

    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations)

    return animations
}
