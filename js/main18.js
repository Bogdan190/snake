const cells = document.querySelectorAll('.item')
const main = document.querySelector('.main')
const [startBtn, newBtn] = document.querySelectorAll('.btns button')

const sideLength = 20
const initLength = 4
const gameState = {
    apple: { x: 3, y: 5 },
    snake: [
        // { x: 1, y: 3 },
        // { x: 1, y: 2 },
        // { x: 1, y: 1 },
        // { x: 1, y: 0 },
    ],
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
    top: { y: 0, direction: 'down' },
    bottom: { y: sideLength - 1, direction: 'up' },
    left: { x: 0, direction: 'right' },
    right: { x: sideLength - 1, direction: 'left' },
}


startBtn.onclick = handleStart

onkeydown = function (e) {
    if (e.key == 'ArrowUp' && gameState.direction != 'down')  gameState.direction = 'up'
    if (e.key == 'ArrowDown' && gameState.direction != 'up')  gameState.direction = 'down'
    if (e.key == 'ArrowRight' && gameState.direction != 'left') gameState.direction = 'right'
    if (e.key == 'ArrowLeft' && gameState.direction != 'right') gameState.direction = 'left'
   
  }

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
    cells[gameState.apple.x + gameState.apple.y * 20].classList.add('apple')
    renderSnake()
}

function renderSnake() {
    // for (const coords of gameState.snake) {
    //     cells[coords.x + coords.y * 20].classList.add('snake')
    // }
    for (const { x, y } of gameState.snake) {
        cells[x + y * 20]?.classList.add('snake')
    }
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
    }
    clear()
    render()

    requestAnimationFrame(animate)
}

function moveSnake() {
    // for (const coords of gameState.snake) {
    //     coords.y++
    // }
    gameState.snake.shift()
    gameState.snake.push(getNextCoords(gameState.snake.at(-1), gameState.direction))

}



function handleStart() {
    addSnake()
    // addApple()
    startGameLoop()
    startBtn.disabled = true
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

    const side = ['top', 'left', 'right', 'bottom'][rnd(4)]
    const { direction, x = rnd(sideLength), y = rnd(sideLength) } = init[side]
    let coords = { x, y }
    gameState.snake.push(coords)
    gameState.direction = direction

    for (let i = 1; i < initLength; i++) {
        coords = getNextCoords(coords, direction)

        gameState.snake.push(coords)
    }
}

function clear() {
    for (const cell of cells) {
        cell.className = "item"
    }
}

