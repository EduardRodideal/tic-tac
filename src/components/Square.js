import React, { useContext } from "react";
import { GeneralContext } from "./context/generalContext";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

export const Square = () => {
  const classes = useStyles();
  const {
    moves,
    setMoves,
    isX,
    setIsX,
    history,
    setHistory,
    historyToShow,
    setHistoryToShow,
    afterHistory,
    setAfterHistory,
    playerPlayer,
    playerComputer,
    computerPlayer,
    winner,
    setWinner,
  } = useContext(GeneralContext);

  const handleClick = (index) => {
    //if two players are playing
    if (!playerPlayer && playerComputer) {
      const tempMoves = [...moves];
      const tempHistory = [...history];

      if (!tempMoves[index] && !afterHistory) {
        //if the cell contains x or o we exit the method
        if (tempMoves[index] === "x" || tempMoves[index] === "o") {
          return;
        }

        if (afterHistory && winner) {
          setWinner(null);
        }
        //if we have a winner
        if (winner && !afterHistory) {
          return;
        }
        tempMoves[index] = isX ? "x" : "o";
        tempHistory.push(tempMoves);

        const winVariants = [
          [tempMoves[0], tempMoves[1], tempMoves[2]],
          [tempMoves[3], tempMoves[4], tempMoves[5]],
          [tempMoves[6], tempMoves[7], tempMoves[8]],
          [tempMoves[0], tempMoves[3], tempMoves[6]],
          [tempMoves[1], tempMoves[4], tempMoves[7]],
          [tempMoves[2], tempMoves[5], tempMoves[8]],
          [tempMoves[0], tempMoves[4], tempMoves[8]],
          [tempMoves[2], tempMoves[4], tempMoves[6]],
        ];
        for (let i = 0; i < winVariants.length; i++) {
          let isXNotO = 0;
          let isO = 0;
          //check what is the situation on each row
          for (let j = 0; j < winVariants[i].length; j++) {
            if (winVariants[i][j] === "o") {
              isO++;
            }
            if (winVariants[i][j] === "x") {
              isXNotO++;
            }
          } // end check what is the situation on each row
          if (isXNotO === 3 || isO === 3) {
            setHistory(tempHistory);
            setIsX(!isX);
            setMoves(tempMoves);
            setHistoryToShow(tempMoves);
            setWinner(isXNotO === 3? "The player with X wins" : "The player with O wins");
            return;
          }
        }
        setHistory(tempHistory);
        setIsX(!isX);
        setMoves(tempMoves);
        setHistoryToShow(tempMoves);
        return;
      }

      if (!tempMoves[index] && afterHistory) {
        //if the cell contains x or o we exit the method
        if (tempMoves[index] === "x" || tempMoves[index] === "o") {
          return;
        }

        if (afterHistory && winner) {
          setWinner(null);
        }
        //if we have a winner
        if (winner && !afterHistory) {
          return;
        }
        let count = 0;
        for (let i = 0; i < historyToShow.length; i++) {
          if (historyToShow[i]) {
            count++;
          }
        }
        setHistory(history.slice(0, count + 1));
        const tempMovesV2 = [...history[count]];
        const tempHistoryV2 = [...history.slice(0, count + 1)];
        tempMovesV2[index] = isX ? "x" : "o";
        tempHistoryV2.push(tempMovesV2);
        const winVariants = [
          [tempMovesV2[0], tempMovesV2[1], tempMovesV2[2]],
          [tempMovesV2[3], tempMovesV2[4], tempMovesV2[5]],
          [tempMovesV2[6], tempMovesV2[7], tempMovesV2[8]],
          [tempMovesV2[0], tempMovesV2[3], tempMovesV2[6]],
          [tempMovesV2[1], tempMovesV2[4], tempMovesV2[7]],
          [tempMovesV2[2], tempMovesV2[5], tempMovesV2[8]],
          [tempMovesV2[0], tempMovesV2[4], tempMovesV2[8]],
          [tempMovesV2[2], tempMovesV2[4], tempMovesV2[6]],
        ];
        for (let i = 0; i < winVariants.length; i++) {
          let isXNotO = 0;
          let isO = 0;
          //check what is the situation on each row
          for (let j = 0; j < winVariants[i].length; j++) {
            if (winVariants[i][j] === "o") {
              isO++;
            }
            if (winVariants[i][j] === "x") {
              isXNotO++;
            }
          } // end check what is the situation on each row
          if (isXNotO === 3 || isO === 3) {
            setHistory(tempHistoryV2);
            setIsX(!isX);
            setMoves(tempMovesV2);
            setHistoryToShow(tempMovesV2);
            setAfterHistory(false);
            setWinner(isXNotO === 3? "The player with X wins" : "The player with O wins");
            return;
          }
        }
        setHistory(tempHistoryV2);
        setIsX(!isX);
        setMoves(tempMovesV2);
        setHistoryToShow(tempMovesV2);
        setAfterHistory(false);
        return;
      }
    }

    //if player plays with computer
    if (!playerComputer && playerPlayer) {
      const tempMoves = [...moves];
      const tempHistory = [...history];
      const tempHistoryToShow = [...historyToShow];
      tempHistoryToShow[index] = "x";
      //if the cell contains x or o we exit the method
      if (tempMoves[index] === "x" || tempMoves[index] === "o") {
        return;
      }

      if (afterHistory && winner) {
        setWinner(null);
      }
      //if we have a winner
      if (winner && !afterHistory) {
        return;
      }
      tempMoves[index] = "x";
      const winVariants = [
        [tempHistoryToShow[0], tempHistoryToShow[1], tempHistoryToShow[2]],
        [tempHistoryToShow[3], tempHistoryToShow[4], tempHistoryToShow[5]],
        [tempHistoryToShow[6], tempHistoryToShow[7], tempHistoryToShow[8]],
        [tempHistoryToShow[0], tempHistoryToShow[3], tempHistoryToShow[6]],
        [tempHistoryToShow[1], tempHistoryToShow[4], tempHistoryToShow[7]],
        [tempHistoryToShow[2], tempHistoryToShow[5], tempHistoryToShow[8]],
        [tempHistoryToShow[0], tempHistoryToShow[4], tempHistoryToShow[8]],
        [tempHistoryToShow[2], tempHistoryToShow[4], tempHistoryToShow[6]],
      ];

      const matrix = {
        "0#0": 0,
        "0#1": 1,
        "0#2": 2,
        "1#0": 3,
        "1#1": 4,
        "1#2": 5,
        "2#0": 6,
        "2#1": 7,
        "2#2": 8,
        "3#0": 0,
        "3#1": 3,
        "3#2": 6,
        "4#0": 1,
        "4#1": 4,
        "4#2": 7,
        "5#0": 2,
        "5#1": 5,
        "5#2": 8,
        "6#0": 0,
        "6#1": 4,
        "6#2": 8,
        "7#0": 2,
        "7#1": 4,
        "7#2": 6,
      };

      //find how many moves ware done
      let countHistoryToShow = 0;
      for (let k = 0; k < tempHistoryToShow.length; k++) {
        if (tempHistoryToShow[k] === "x") {
          countHistoryToShow++;
        }
      }
      //if last move
      if (countHistoryToShow === 5) {
        tempHistory.push(tempMoves);
        setHistory(tempHistory);
        setIsX(false);
        setMoves(tempMoves);
        setHistoryToShow(tempMoves);
        return;
      }

      //if first move
      if (countHistoryToShow === 1) {
        if (tempMoves[4] === "x") {
          tempMoves[2] = "o";
        } else {
          tempMoves[4] = "o";
        }
        tempHistory.push(tempMoves);
        setHistory(tempHistory);
        setIsX(true);
        setMoves(tempMoves);
        setHistoryToShow(tempMoves);
        return;
      }

      //check what is the situation on the board /////////////////////////1111111111111111111111111111
      for (let i = 0; i < winVariants.length; i++) {
        let isNull = 0;
        let isO = 0;
        //check what is the situation on each row
        for (let j = 0; j < winVariants[i].length; j++) {
          if (winVariants[i][j] === "o") {
            isO++;
          }
          if (winVariants[i][j] === null) {
            isNull++;
          }
        } // end check what is the situation on each row

        // if we have a winning combination  !afterHistory && afterHistory
        if (isNull === 1 && isO === 2) {
          for (let k = 0; k < 3; k++) {
            if (winVariants[i][k] === null && !afterHistory) {
              const matrixIndex = i + "#" + k;
              tempMoves[matrix[matrixIndex]] = "o";
              tempHistory.push(tempMoves);
              setHistory(tempHistory);
              setIsX(true);
              setMoves(tempMoves);
              setHistoryToShow(tempMoves);
              setWinner("The Computer Wins");
              return;
            }
            if (winVariants[i][k] === null && afterHistory) {
              let count = 0;
              for (let i = 0; i < historyToShow.length; i++) {
                if (historyToShow[i]) {
                  count++;
                }
              }
              const matrixIndex = i + "#" + k;
              const tempMovesV2 = [...history[count / 2]];
              tempMovesV2[index] = "x";
              tempMovesV2[matrix[matrixIndex]] = "o";
              const tempHistoryV2 = [...history.slice(0, count / 2 + 1)];
              tempHistoryV2.push(tempMovesV2);
              setHistory(tempHistoryV2);
              setIsX(true);
              setMoves(tempMovesV2);
              setHistoryToShow(tempMovesV2);
              setAfterHistory(false);
              setWinner("The Computer Wins");
              return;
            }
          }
        } //end if we have a winning combination
      } //end for/ check what is the situation on the board

      ///////////////////////////////////////////////////////////////////////////////////////////2222222222222222222
      //check what is the situation on the board 2
      for (let i = 0; i < winVariants.length; i++) {
        let isNull = 0;
        let isXNotO = 0;
        //check what is the situation on each row
        for (let j = 0; j < winVariants[i].length; j++) {
          if (winVariants[i][j] === null) {
            isNull++;
          }
          if (winVariants[i][j] === "x") {
            isXNotO++;
          }
        } // end check what is the situation on each row

        //if we have a loosing situation
        if (isNull === 1 && isXNotO === 2) {
          for (let k = 0; k < 3; k++) {
            if (winVariants[i][k] === null && !afterHistory) {
              const matrixIndex = i + "#" + k;
              tempMoves[matrix[matrixIndex]] = "o";
              tempHistory.push(tempMoves);
              setHistory(tempHistory);
              setIsX(true);
              setMoves(tempMoves);
              setHistoryToShow(tempMoves);
              return;
            }

            if (winVariants[i][k] === null && afterHistory) {
              let count = 0;
              for (let i = 0; i < historyToShow.length; i++) {
                if (historyToShow[i]) {
                  count++;
                }
              }
              const matrixIndex = i + "#" + k;
              const tempMovesV2 = [...history[count / 2]];
              tempMovesV2[index] = "x";
              tempMovesV2[matrix[matrixIndex]] = "o";
              const tempHistoryV2 = [...history.slice(0, count / 2 + 1)];
              tempHistoryV2.push(tempMovesV2);
              setHistory(tempHistoryV2);
              setIsX(true);
              setMoves(tempMovesV2);
              setHistoryToShow(tempMovesV2);
              setAfterHistory(false);
              return;
            }
          }
        }
      } //end for/ check what is the situation on the board

      ///////////////////////////////////////////////////////////////////////////////////////////3333333333333333333333333333
      //check what is the situation on the board 2
      for (let i = 0; i < winVariants.length; i++) {
        let isNull = 0;
        let isO = 0;
        //check what is the situation on each row
        for (let j = 0; j < winVariants[i].length; j++) {
          if (winVariants[i][j] === "o") {
            isO++;
          }
          if (winVariants[i][j] === null) {
            isNull++;
          }
        } // end check what is the situation on each row

        //we construct a winning situation
        if (isNull === 2 && isO === 1) {
          for (let k = 0; k < 3; k++) {
            if (winVariants[i][k] === null && !afterHistory) {
              const matrixIndex = i + "#" + k;
              tempMoves[matrix[matrixIndex]] = "o";
              tempHistory.push(tempMoves);
              setHistory(tempHistory);
              setIsX(true);
              setMoves(tempMoves);
              setHistoryToShow(tempMoves);
              return;
            }
            if (winVariants[i][k] === null && afterHistory) {
              let count = 0;
              for (let i = 0; i < historyToShow.length; i++) {
                if (historyToShow[i]) {
                  count++;
                }
              }
              const matrixIndex = i + "#" + k;
              const tempMovesV2 = [...history[count / 2]];
              tempMovesV2[index] = "x";
              tempMovesV2[matrix[matrixIndex]] = "o";
              const tempHistoryV2 = [...history.slice(0, count / 2 + 1)];
              tempHistoryV2.push(tempMovesV2);
              setHistory(tempHistoryV2);
              setIsX(true);
              setMoves(tempMovesV2);
              setHistoryToShow(tempMovesV2);
              setAfterHistory(false);
              return;
            }
          }
        }
      } //end for/ check what is the situation on the board

      ///////////////////////////////////////////////////////////////////////////////////////////4444444444444444444444444
      //check what is the situation on the board 2
      for (let i = 0; i < winVariants.length; i++) {
        //place a o on any cell
        for (let k = 0; k < 3; k++) {
          if (winVariants[i][k] === null && !afterHistory) {
            const matrixIndex = i + "#" + k;
            tempMoves[matrix[matrixIndex]] = "o";
            tempHistory.push(tempMoves);
            setHistory(tempHistory);
            setIsX(true);
            setMoves(tempMoves);
            setHistoryToShow(tempMoves);
            return;
          }
          if (winVariants[i][k] === null && afterHistory) {
            let count = 0;
            for (let i = 0; i < historyToShow.length; i++) {
              if (historyToShow[i]) {
                count++;
              }
            }
            const matrixIndex = i + "#" + k;
            const tempMovesV2 = [...history[count / 2]];
            tempMovesV2[index] = "x";
            tempMovesV2[matrix[matrixIndex]] = "o";
            const tempHistoryV2 = [...history.slice(0, count / 2 + 1)];
            tempHistoryV2.push(tempMovesV2);
            setHistory(tempHistoryV2);
            setIsX(true);
            setMoves(tempMovesV2);
            setHistoryToShow(tempMovesV2);
            setAfterHistory(false);
            return;
          }
        }
      } //end for/ check what is the situation on the board
    } //playerComputer

    //if computer plays with player
    if (!computerPlayer && playerPlayer) {
      const tempMoves = [...moves];
      const tempHistory = [...history];
      const tempHistoryToShow = [...historyToShow];
      // alert("tempMoves -" + tempMoves[index])
      // alert("tempMoves4 -" + tempMoves[4])
      if (tempMoves[index] === "x" || tempMoves[index] === "o") {
        return;
      }
      if (afterHistory && winner) {
        setWinner(null);
      }
      //if we have a winner
      if (winner && !afterHistory) {
        return;
      }
      // alert("tempMoves3 -" + tempMoves[1])
      tempHistoryToShow[index] = "o";
      //if the cell contains x or o we exit the method

      tempMoves[index] = "o";
      // alert("index is - "+index);
      // alert("tempHistoryToShow[0] = "+tempHistoryToShow[0])
      const winVariants = [
        [tempHistoryToShow[0], tempHistoryToShow[1], tempHistoryToShow[2]],
        [tempHistoryToShow[3], tempHistoryToShow[4], tempHistoryToShow[5]],
        [tempHistoryToShow[6], tempHistoryToShow[7], tempHistoryToShow[8]],
        [tempHistoryToShow[0], tempHistoryToShow[3], tempHistoryToShow[6]],
        [tempHistoryToShow[1], tempHistoryToShow[4], tempHistoryToShow[7]],
        [tempHistoryToShow[2], tempHistoryToShow[5], tempHistoryToShow[8]],
        [tempHistoryToShow[0], tempHistoryToShow[4], tempHistoryToShow[8]],
        [tempHistoryToShow[2], tempHistoryToShow[4], tempHistoryToShow[6]],
      ];

      const matrix = {
        "0#0": 0,
        "0#1": 1,
        "0#2": 2,
        "1#0": 3,
        "1#1": 4,
        "1#2": 5,
        "2#0": 6,
        "2#1": 7,
        "2#2": 8,
        "3#0": 0,
        "3#1": 3,
        "3#2": 6,
        "4#0": 1,
        "4#1": 4,
        "4#2": 7,
        "5#0": 2,
        "5#1": 5,
        "5#2": 8,
        "6#0": 0,
        "6#1": 4,
        "6#2": 8,
        "7#0": 2,
        "7#1": 4,
        "7#2": 6,
      };

      //check what is the situation on the board /////////////////////////1111111111111111111111111111
      for (let i = 0; i < winVariants.length; i++) {
        let isNull = 0;
        let isXNotO = 0;
        //check what is the situation on each row
        for (let j = 0; j < winVariants[i].length; j++) {
          if (winVariants[i][j] === "x") {
            isXNotO++;
          }
          if (winVariants[i][j] === null) {
            isNull++;
          }
        } // end check what is the situation on each row

        // if we have a winning combination  !afterHistory && afterHistory
        if (isNull === 1 && isXNotO === 2) {
          for (let k = 0; k < 3; k++) {
            if (!afterHistory && winVariants[i][k] === null) {
              const matrixIndex = i + "#" + k;
              tempMoves[matrix[matrixIndex]] = "x";
              tempHistory.push(tempMoves);
              setHistory(tempHistory);
              setIsX(true);
              setMoves(tempMoves);
              setHistoryToShow(tempMoves);
              setWinner("The Computer Wins");
              return;
            }
            if (afterHistory && winVariants[i][k] === null) {
              let count = 0;
              for (let i = 0; i < historyToShow.length; i++) {
                if (historyToShow[i]) {
                  count++;
                }
              }
              const matrixIndex = i + "#" + k;
              const tempMovesV2 = [...history[(count + 1) / 2]];
              tempMovesV2[index] = "o";
              tempMovesV2[matrix[matrixIndex]] = "x";
              const tempHistoryV2 = [...history.slice(0, (count + 1) / 2 + 1)];
              tempHistoryV2.push(tempMovesV2);
              setHistory(tempHistoryV2);
              setIsX(true);
              setMoves(tempMovesV2);
              setHistoryToShow(tempMovesV2);
              return;
            }
          }
        } //end if we have a winning combination
      } //end for/ check what is the situation on the board

      ///////////////////////////////////////////////////////////////////////////////////////////2222222222222222222
      //check what is the situation on the board 2
      for (let i = 0; i < winVariants.length; i++) {
        let isNull = 0;
        let isO = 0;
        //check what is the situation on each row
        for (let j = 0; j < winVariants[i].length; j++) {
          if (winVariants[i][j] === null) {
            isNull++;
          }
          if (winVariants[i][j] === "o") {
            isO++;
          }
        } // end check what is the situation on each row

        //if we have a loosing situation
        if (isNull === 1 && isO === 2) {
          for (let k = 0; k < 3; k++) {
            if (!afterHistory && winVariants[i][k] === null) {
              const matrixIndex = i + "#" + k;
              tempMoves[matrix[matrixIndex]] = "x";
              tempHistory.push(tempMoves);
              setHistory(tempHistory);
              setIsX(true);
              setMoves(tempMoves);
              setHistoryToShow(tempMoves);
              return;
            }

            if (afterHistory && winVariants[i][k] === null) {
              let count = 0;
              for (let i = 0; i < historyToShow.length; i++) {
                if (historyToShow[i]) {
                  count++;
                }
              }
              const matrixIndex = i + "#" + k;
              const tempMovesV2 = [...history[(count + 1) / 2]];
              tempMovesV2[index] = "o";
              tempMovesV2[matrix[matrixIndex]] = "x";
              const tempHistoryV2 = [...history.slice(0, (count + 1) / 2 + 1)];
              tempHistoryV2.push(tempMovesV2);
              setHistory(tempHistoryV2);
              setIsX(true);
              setMoves(tempMovesV2);
              setHistoryToShow(tempMovesV2);
              setAfterHistory(false);
              return;
            }
          }
        }
      } //end for/ check what is the situation on the board

      ///////////////////////////////////////////////////////////////////////////////////////////3333333333333333333333333333
      //check what is the situation on the board 2
      for (let i = 0; i < winVariants.length; i++) {
        let isNull = 0;
        let isXNotO = 0;
        //check what is the situation on each row
        for (let j = 0; j < winVariants[i].length; j++) {
          if (winVariants[i][j] === "x") {
            isXNotO++;
          }
          if (winVariants[i][j] === null) {
            isNull++;
          }
        } // end check what is the situation on each row

        //we construct a winning situation
        if (isNull === 2 && isXNotO === 1) {
          for (let k = 0; k < 3; k++) {
            if (!afterHistory && winVariants[i][k] === null) {
              const matrixIndex = i + "#" + k;
              tempMoves[matrix[matrixIndex]] = "x";
              tempHistory.push(tempMoves);
              setHistory(tempHistory);
              setIsX(true);
              setMoves(tempMoves);
              setHistoryToShow(tempMoves);
              return;
            }
            if (afterHistory && winVariants[i][k] === null) {
              let count = 0;
              for (let i = 0; i < historyToShow.length; i++) {
                if (historyToShow[i]) {
                  count++;
                }
              }
              const matrixIndex = i + "#" + k;
              const tempMovesV2 = [...history[(count + 1) / 2]];
              tempMovesV2[index] = "o";
              tempMovesV2[matrix[matrixIndex]] = "x";
              const tempHistoryV2 = [...history.slice(0, (count + 1) / 2 + 1)];
              tempHistoryV2.push(tempMovesV2);
              setHistory(tempHistoryV2);
              setIsX(true);
              setMoves(tempMovesV2);
              setHistoryToShow(tempMovesV2);
              setAfterHistory(false);
              return;
            }
          }
        }
      } //end for/ check what is the situation on the board

      ///////////////////////////////////////////////////////////////////////////////////////////4444444444444444444444444
      //if we can not either win nor lose

      for (let i = 0; i < winVariants.length; i++) {
        //place a x on any cell
        for (let k = 0; k < 3; k++) {
          if (!afterHistory && winVariants[i][k] === null) {
            const matrixIndex = i + "#" + k;
            tempMoves[matrix[matrixIndex]] = "x";
            tempHistory.push(tempMoves);
            setHistory(tempHistory);
            setIsX(true);
            setMoves(tempMoves);
            setHistoryToShow(tempMoves);
            return;
          }
          if (afterHistory && winVariants[i][k] === null) {
            let count = 0;
            for (let i = 0; i < historyToShow.length; i++) {
              if (historyToShow[i]) {
                count++;
              }
            }
            const matrixIndex = i + "#" + k;
            const tempMovesV2 = [...history[(count + 1) / 2]];
            tempMovesV2[index] = "o";
            tempMovesV2[matrix[matrixIndex]] = "x";
            const tempHistoryV2 = [...history.slice(0, (count + 1) / 2 + 1)];
            tempHistoryV2.push(tempMovesV2);
            setHistory(tempHistoryV2);
            setIsX(true);
            setMoves(tempMovesV2);
            setHistoryToShow(tempMovesV2);
            setAfterHistory(false);
            return;
          }
        }
      } //end for/ check what is the situation on the board
    } //playerComputer
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        className="margin-table"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button onClick={() => handleClick(0)} className="xo-font">
          {historyToShow[0]}
        </Button>
        <Button onClick={() => handleClick(1)} className="xo-font">
          {historyToShow[1]}
        </Button>
        <Button onClick={() => handleClick(2)} className="xo-font">
          {historyToShow[2]}
        </Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={() => handleClick(3)} className="xo-font">
          {historyToShow[3]}
        </Button>
        <Button onClick={() => handleClick(4)} className="xo-font">
          {historyToShow[4]}
        </Button>
        <Button onClick={() => handleClick(5)} className="xo-font">
          {historyToShow[5]}
        </Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={() => handleClick(6)} className="xo-font">
          {historyToShow[6]}
        </Button>
        <Button onClick={() => handleClick(7)} className="xo-font">
          {historyToShow[7]}
        </Button>
        <Button onClick={() => handleClick(8)} className="xo-font">
          {historyToShow[8]}
        </Button>
      </ButtonGroup>
    </div>
  );
};
