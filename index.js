
const X_TURN = 'x';
const O_TURN = 'o';
let circleTurn = false;
const winningCombinations = [
    [0,3,6], [1,4,7], [2,5,8],
    [0,1,2], [3,4,5], [6,7,8],
    [0,4,8], [2,4,6]
];
const winningText = document.querySelector('.winning-text');
const winn = document.querySelector('.winning');
const board = document.getElementById('board');
let cells = document.querySelectorAll('[data-cell]');
const restart = document.querySelector('#restart-button');

restart.addEventListener('click',startGame);
function startGame(){
    cells.forEach((cell)=>{
        cell.classList.remove(X_TURN);
        cell.classList.remove(O_TURN);
        cell.removeEventListener('click',handleClick);
        winn.classList.remove('show');
        cell.addEventListener('click',handleClick,{once: true})
    });
    setHoveringBoard(board);
}

function handleClick(e) {
    const turn = circleTurn ? O_TURN : X_TURN;
    move(e.target,turn);
    if(winning(turn)){
        console.log('win');
        endGame(turn,true);
    }
    else if(draw(turn)){
        endGame(turn,false);
    }
    else {
        swapTurn();
        setHoveringBoard(board);
    }
}

function endGame(turn,win) {
    if(win)
    {
        winningText.innerText = `${turn == 'x' ? 'X':'O'}'S WIN!`;
    }
    else 
    {
        winningText.innerText = 'DRAW!';
    }
    
    winn.classList.add('show');
}
function winning(turn) {
    
    return winningCombinations.some((combination)=>{
      return combination.every((index)=>{
        return cells[index].classList.contains(turn);
      })
    })
}

function draw() {
    return [...cells].every((cell)=>{
       return cell.classList.contains(X_TURN) ||
        cell.classList.contains(O_TURN);
    })
}
function setHoveringBoard(board) {
    const turn = circleTurn ? O_TURN : X_TURN;
    board.classList.remove(X_TURN);
    board.classList.remove(O_TURN);
    board.classList.add(turn);
}
function move (cell,turn)
{
    cell.classList.remove(X_TURN);
    cell.classList.remove(O_TURN);
    cell.classList.add(turn);
}
function swapTurn() {
    circleTurn = !circleTurn;
}

startGame();