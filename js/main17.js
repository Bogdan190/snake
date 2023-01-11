const cells = document.querySelectorAll('.item')
const main = document.querySelector('.main')
const [startBtn, newBtn] = document.querySelectorAll('.btns button')

const sideLength = 20
const initLength = 4
const gameState = {
    apple: { x: 3, y: 5 },
    snake: [],
    direction: "down",
}

let prevTs = 0
let delta = 0
const step = 500
let nextStep = step

//const state = { x: 9, y: 3 }

const shifts = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
}

const init = {
    top: { x: rnd(sideLength), y: 0, direction: 'down' },
    bottom: { x: rnd(sideLength), y: sideLength - 1, direction: 'up' },
    left: { x: 0, y: rnd(sideLength), direction: 'right' },
    right: { x: sideLength - 1, y: rnd(sideLength), direction: 'left' },
}


startBtn.onclick = handleStart

function rnd(limit) {
    return Math.floor(Math.random() * limit)
}

function getNextCoords(from, direction) {
    return {
        x: from.x + shifts[direction].x,
        y: from.y + shifts[direction].y,
    }
}

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
        moveSnake()
        // state.y++
        // if (state.y >= 20) {
        //     state.y = 0
        // }
    }
    clear()
    render()

    requestAnimationFrame(animate)
}

function moveSnake() {

}

function handleStart() {
    addSnake()
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
    // ? выбрать сторону
    // ? выбрать точку на ней 
    // ? создать клетки змейки

    const side = ['top', 'left', 'right', 'bootom'][rnd(4)]
    let {direction, ...coords} = init[side]
    gameState.snake.push(coords)
    gameState.direction = direction

    for (let i = 1; i < initLength; i++){
        const nextCoords = getNextCoords(coords, direction)
        
        gameState.snake.push(nextCoords)
    }
}

function clear() {
    for (const cell of cells) {
        cell.className = "item"
    }
}

