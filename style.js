// Selectors
const name1 = /*prompt('Enter the Name of 1st Player') || */ 'Player1';
document.querySelector('.name1').textContent = name1;
const name2 = /*prompt('Enter the Name of 2nd Player') || */ 'Player2';
document.querySelector('.name2').textContent = name2;
const bx = document.querySelectorAll('.box');
let boxes = [];
let k = 0;
for (let i = 0; i < 3; i++) {
    let box = []
    for (let j = 0; j < 3; j++) {
        box.push(bx[k++]);
    }
    boxes.push(box);
}
let isX = false;
let player1 = 0;
let player2 = 0;
let tempMatrix, boxMatrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const announcement = document.querySelector('.announcement');
const h1 = announcement.querySelector('h1');
const p = announcement.querySelector('p');


// Functions
function displayBox() {
    let i = 0;
    while (i < 3) {
        let j = 0;
        while (j < 3) {
            boxes[i][j].querySelector('h1').textContent = boxMatrix[i][j];
            j++;
        }
        i++;
    }
}
let isDraw = false;
function updatePlayerScore(cell) {
    if (cell === 'X') {
        document.querySelector('.player1').textContent++;
        h1.textContent = `Congratulations ${name1}`;
    } else {
        document.querySelector('.player2').textContent++
        h1.textContent = `Congratulations ${name2}`;
    }

    announcement.style.display = 'initial';

    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boxMatrix[i][j] = '';
            }
        }
        announcement.style.display = 'none';
        displayBox();
    }, 1000);
}

function drawCondition() {
    h1.textContent = 'Match Draw';
    p.textContent = '';
    announcement.style.display = 'initial';
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boxMatrix[i][j] = '';
            }
        }
        announcement.style.display = 'none';
        displayBox();
    }, 1000);
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if ((boxMatrix[i][1] === boxMatrix[i][0] && boxMatrix[i][1] === boxMatrix[i][2]) && boxMatrix[i][1] !== '') {
            updatePlayerScore(boxMatrix[i][1]);
        } else if ((boxMatrix[1][i] === boxMatrix[0][i] && boxMatrix[1][i] === boxMatrix[2][i]) && boxMatrix[1][i] !== '') {
            updatePlayerScore(boxMatrix[1][i]);
        }
    }
    if (((boxMatrix[0][0] === boxMatrix[1][1] && boxMatrix[1][1] === boxMatrix[2][2]) || (boxMatrix[0][2] === boxMatrix[1][1] && boxMatrix[1][1] === boxMatrix[2][0])) && boxMatrix[1][1] !== '') {
        updatePlayerScore(boxMatrix[1][1]);
    } else {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boxMatrix[i][j] === '') {
                    return;
                }
            }
        }
        drawCondition();
    }
}

function updateMatrixValue() {
    const index1 = this.dataset.index1;
    const index2 = this.dataset.index2;

    if (boxMatrix[index1][index2] === '') {
        if (!isX) {
            boxMatrix[index1][index2] = 'X';
        } else {
            boxMatrix[index1][index2] = 'O';
        }
        isX = !isX;
        displayBox();
    }
}

// Event listner

bx.forEach(box => box.addEventListener('click', updateMatrixValue));
bx.forEach(box => box.addEventListener('click', checkWinner));