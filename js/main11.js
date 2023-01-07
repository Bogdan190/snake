



let cells = document.querySelectorAll('.item')
let main = document.querySelector('.main')
const [startBtn, newBtn] = document.querySelectorAll('.btns button')

startBtn.onclick = handleStart


function handleStart(){
    clear()
    addSnake()
    addApple()
}

function addApple(){
    do{
        let i = Math.floor(Math.random()*400)
        if(!cells[i].classList.contains('snake')){
            cells[i].classList.add('apple')
        }
    } while(!main.querySelector('.apple'))
}

function addSnake(){
    cells[99].classList.add('snake')
}

function clear(){
    for (const cell of cells) {
        cell.className = "item"
    }
}

