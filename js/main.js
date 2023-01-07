



let cells = document.querySelectorAll('.item')
let main = document.querySelector('.main')
const [startBtn, newBtn] = document.querySelectorAll('.btns button')

const gameState = {
    apple: { x: 3, y: 5 },
    snake: [
        { x: 11, y: 7 },
        { x: 12, y: 7 },
        { x: 13, y: 7 }
    ],
    direction: "down"
}

console.log(gameState)

let prevTs = 0
let delta = 0
const step = 500
let nextStep = step

const state = { x: 9, y: 3 }
function render() {
    cells[state.x + state.y * 20].classList.add('apple')
}

function startGameLoop() {
    requestAnimationFrame(animate)
}

function animate(ts) {
    delta = ts - prevTs
    prevTs = ts
    nextStep -= delta
    if (nextStep < 0) {
        nextStep += step
        state.y++
        if (state.y >= 20) {
            state.y = 0
        }
    }
    clear()
    render()
    requestAnimationFrame(animate)
}

startBtn.onclick = handleStart


function handleStart() {

    // addSnake()
    // addApple()
    startGameLoop()
}

function addApple() {
    do {
        let i = Math.floor(Math.random() * 400)
        if (!cells[i].classList.contains('snake')) {
            cells[i].classList.add('apple')
        }
    } while (!main.querySelector('.apple'))
}

function addSnake() {
    cells[99].classList.add('snake')
}

function clear() {
    for (const cell of cells) {
        cell.className = "item"
    }
}

