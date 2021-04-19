import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




function Square(props) {
    return (
        <button
            key={props.id}
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {


    renderSquare(row, col) {
        let keyId = row + ',' + col;
        return (
            <button
                key={keyId}
                className="square"
                onClick={() => this.props.onClick(row, col)}>
                {this.props.squares[row][col]}
            </button>
        );
    }

    makeRow(row) {
        let cols = [...new Array(this.props.squares[row].length)].map((currElement, index) => this.renderSquare(row, index));
        return (
            <div key={row} className="board-row">
                {cols}
            </div>
        );
    }

    makeBoard() {
        return [...new Array(this.props.squares.length)].map((currElement, index) => this.makeRow(index));
    }

    render() {
        return (
            <div>
                {this.makeBoard()}
            </div>
        );
    }
}

/*
// Create a multidimensional array
let table = new Array(10);               // 10 rows of the table
for(let i = 0; i < table.length; i++) {
    table[i] = new Array(10);            // Each row has 10 columns
}

// Initialize the array
for(let row = 0; row < table.length; row++) {
    for(let col = 0; col < table[row].length; col++) {
        table[row][col] = row*col;
    }
}

// Use the multidimensional array to compute 5*7
table[5][7]  // => 35
 */

class Game extends React.Component {
    constructor(props) {
        super(props);

        let rows = 5;
        let cols = 5; //square board
        let gameTable = new Array(rows);
        for(let row = 0; row < gameTable.length; row++){
            //gameTable[row] = [...new Array(cols)].map((currElement, index) => row + ', ' + index);
            gameTable[row] = new Array(cols).fill(null);
        }

        this.state = {
            history: [{
                squares: gameTable,
            }],
            stepNumber: 0,
            xIsNext: true,
        }
        console.log(this.state);
    }

    handleClick(row, col) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares, row, col) || squares[row][col]) {
            return;
        }
        squares[row][col] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        let status;
        if(winner) {
            status = 'Vinner: ' + winner;
        } else {
            status = 'Neste spiller: ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {current.squares}
                        onClick = {(row, col) => this.handleClick(row, col)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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

function calculateWinner(squares) {




    const lines = [
        [ 0,  1,  2,  3],
        [ 4,  5,  6,  7],
        [ 8,  9, 10, 11],
        [12, 13, 14, 15],
        [ 0,  4,  8, 12],
        [ 1,  5,  9, 13],
        [ 2,  6, 10, 14],
        [ 3,  7, 11, 15],
        [ 2,  5,  8],
        [ 3,  6,  9, 12],
        [ 7, 10, 13],
        [ 1,  6, 11],
        [ 0,  5, 10, 15],
        [ 4,  9, 14],
    ];
    /*
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        for (let j = 0; j < line.length; j++) {
            if(line.length - j > 2) {
                if (squares[line[j]] && squares[line[j]] === squares[line[j+1]] && squares[line[j+1]] === squares[line[j+2]]) {
                    return squares[line[j]];
                }
            }
        }*/
        /*const [a, b, c, d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }*/
    return null;
}