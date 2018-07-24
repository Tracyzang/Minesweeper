const generatePlayerBoard =(numberOfRows,numberOfColumns)=>{
  let board = [];
  for(let rowIndex = 0; rowIndex< numberOfRows ; rowIndex++){
    let row = [];
  for(let columnIndex=0; columnIndex<numberOfColumns; columnIndex++){
    row.push(' ');
  }

  board.push(row);

}
  return board;
};

console.log(generatePlayerBoard(3,2));


//console.log(board);

const generateBombBoard = (numberOfRows,numberOfColumns,numberOfBombs) =>{
  let board = [];
  for(let rowIndex = 0; rowIndex< numberOfRows ; rowIndex++){
    let row = [];
  for(let columnIndex=0; columnIndex<numberOfColumns; columnIndex++){
    row.push(null);
  }

  board.push(row);

}

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced<numberOfBombs){
  let randomRowIndex = Math.floor(Math.random()*numberOfRows);
  let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
  if(board[randomRowIndex][randomColumnIndex] !=='B') {
  board[randomRowIndex][randomColumnIndex]='B';
  numberOfBombsPlaced++;
};
}
  return board;

};

const getNumberOfNeighborBombs =(bombBoard,rowIndex,columnIndex)=>{
  const neighborOffsets = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1],
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  const numberOfBombs = 0;
  neighborOffsets.forEach(function(offset){
    const neighborRowIndex = rowIndex+offset[0];
    const neighborColumnIndex = columnIndex+offset[1];
    if(neighborRowIndex>=0 && neighborRowIndex<numberOfRows && neighborColumnIndex>=0 && neighborColumnIndex<numberOfColumns){
    if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
      numberOfBombs++;

    }

  };
});

return numberOfBombs;

};

const flipTitle = (playerBoard,bombBoard,rowIndex,columnIndex)=>{
  if(playerBoard[rowIndex][columnIndex] !== ''){
    console.log('This tile has already been flipped!');
    return

  } else if( bombBoard[rowIndex][columnIndex] ==='B'){
    playerBoard[rowIndex][columnIndex]==='B';

  } else{
    playerBoard[rowIndex][columnIndex]=getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex)
  };

}



let printBoard = (board)=>{
  console.log(board.map(row =>row.join(' | ')).join('\n'));

};


let playerBoard = generatePlayerBoard(3,4);

let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board:');

printBoard(playerBoard);

console.log('Bomb Board:');

printBoard(bombBoard);
flipTitle(playerBoard,bombBoard,1,0);
console.log('Updated Player Board:');
printBoard(playerBoard);
