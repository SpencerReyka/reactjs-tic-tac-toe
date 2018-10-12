import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log("output is {}", squares[a]);
      return true;
    }
  }
  return null;
}

function Square(props){
  return ( 
    <button
      className="square"
      onClick={props.onClickFunctionFromParent}
    >
      {props.value}
    </button>
  )
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setUpBoard();
  }

  handlesClick(x) {
    var finished = false;
    const squares = this.state.squares.slice();
    if(this.state.hasFinished){
      this.setState(this.setUpBoard());
      return;
    } else if(squares[x]!=null){
      return;
    } 
    squares[x] = this.state.currState;
    if(calculateWinner(squares)){
      finished = true;
    } 
    this.setState({squares: squares, currState: (this.state.currState === 'X') ? 'O' : 'X', hasFinished: finished});
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClickFunctionFromParent={()=> this.handlesClick(i)}
      />
      );
  }

  setUpBoard(){
    return{
      squares: Array(9).fill(null),
      currState: 'X',
      hasFinished: false,
    };
  }

  render() {
    const winner = this.state.hasFinished;
    let status;
    if (winner) {
      status = 'Winner: ' + winner + ', press anywhere to reset!';
    } else {
      status = 'Next player: ' + this.state.currState;
    } 

    return (
      <div>
        <div className="status"> {status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  