class Game{
  constructor(numberOfRows,numberOfColumns,numberOfBombs){
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }
  playMove(rowIndex,columnIndex){
    this._board.flipTile(rowIndex,columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('The game is over');
      this._board.print();
    } else if(!this._board.hasSafeTiles()){
      console.log("The user has won the game.");
    } else{
      console.log("Current Board: ");
      this._board.print();
    }
  }
};

class Board{
  constructor(numberOfRows,numberOfColumns,numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows*numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
      return this._playerBoard;
    }

   flipTile(rowIndex,columnIndex){
     //console.log(this);
     //console.log(this._playerBoard);
     //console.log(rowIndex);
     //console.log(this._playerBoard[rowIndex]);
      if(this._playerBoard[rowIndex][columnIndex] !== ' '){
        return;


      } else if(this._bombBoard[rowIndex][columnIndex] ==='B'){
        this._playerBoard[rowIndex][columnIndex]==='B';

      } else{
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles --;

    }

  getNumberOfNeighborBombs(rowIndex,columnIndex){
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
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      //console.log(this);
      const that = this;
      neighborOffsets.forEach(function(offset){
        const neighborRowIndex = rowIndex+offset[0];
        const neighborColumnIndex = columnIndex+offset[1];
        if(neighborRowIndex>=0 && neighborRowIndex<numberOfRows && neighborColumnIndex>=0 && neighborColumnIndex<numberOfColumns){
//console.log(this)
        if (that._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });

    return numberOfBombs;

    }

    hasSafeTiles(){
      return this._numberOfTiles !== this._numberOfBombs;

      }

    print(){
       console.log(this._playerBoard.map(row =>row.join(' | ')).join('\n'));

     }

    static generatePlayerBoard(numberOfRows,numberOfColumns){
       let board = [];
       for(let rowIndex = 0; rowIndex< numberOfRows ; rowIndex++){
         let row = [];
       for(let columnIndex=0; columnIndex<numberOfColumns; columnIndex++){
         row.push(' ');
       }

       board.push(row);

     }
       return board;
     }

     //console.log(generatePlayerBoard(3,2));
     static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
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

    }

    const g =new Game(3,3,3);
    g.playMove(2,0);
