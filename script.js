const createPlayer = (name, marker) => {
    return {name, marker}
}

const displayName = (name1, name2) => {
    let player1Name = document.querySelector(".player-1");
    let player2Name = document.querySelector(".player-2");

    player1Name.textContent = name1 + ' X';
    player2Name.textContent = name2 + ' O';
}

const gameBoard = (() => {
    let board = Array(9).fill("");

    const makeMove = (index, marker) => {
        if( index >= 0 && index < 9 && board[index] === "" ){
            board[index] = marker;
            const tile = document.querySelector(`[data-index="${index}"]`);
            if(tile){
                tile.textContent = marker;
            }
            return true;
        }
        else{
            alert("Invalid input, put on empty space")
        }
    }

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]            // diagonals 
    ];

    const winCondition = ((player) => {
        for(const combo of winningCombos){
            const [a,b,c] = combo
            if(board[a] === player.marker && board[b] === player.marker && board[c] === player.marker){
                return true;
            }
        }
    })

    return{makeMove, winCondition}
})();

function game() {
    let player1;
    let player2;
    let currentPlayer;

    // modal-dialog
const dialog = document.querySelector("dialog");
dialog.showModal();

const submitButton = document.querySelector(".submitButton");
submitButton.addEventListener("click", (e)=> {
    e.preventDefault();


    let player1Setname = document.getElementById("player1").value;  
    let player2Setname = document.getElementById("player2").value;

    player1 = createPlayer(player1Setname, 'X');
    player2 = createPlayer(player2Setname, 'O');
    displayName(player1Setname, player2Setname);

    dialog.close();

    // First player moves
    currentPlayer = player1;

})

    // Make-move
    document.addEventListener("click", (e)=>{
        if(e.target.matches(".tile")){
            let userMove = Number(e.target.dataset.index)

    

            
            // change players n check win
            if(gameBoard.makeMove(userMove, currentPlayer.marker)){
                if(gameBoard.winCondition(currentPlayer)){
                    setTimeout(()=> alert("gg"), 150);
                }
                else{
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                }
                
            }
        }
    })

   
}

game();
