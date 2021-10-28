export default function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
