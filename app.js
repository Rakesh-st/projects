const boxes = document.querySelectorAll('.box');
const massage = document.querySelector('#msg');
const cnt = document.querySelector('.msgcnt');
const newGame = document.querySelector('#new');
const reset = document.querySelector('#reset');

let turnO = true;
let count = 0;


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    cnt.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let chWinner = checkWinner();

        if (count === 9 && ! chWinner){
            gameDraw();
        }
    });
});


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    };
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};
const gameDraw = () => {
    massage.innerText = `Game was a Draw.`;
    cnt.classList.remove("hide");
    disableBoxes();
};
const showWinner = (winner) => {
    massage.innerText = `Congratulations, Winner is ${winner}`;
    cnt.classList.remove("hide");
    disableBoxes();
};



const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            };
        };
    };
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);