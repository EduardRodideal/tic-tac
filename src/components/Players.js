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
      margin: theme.spacing(1),
    },
  },
}));

export const Players = () => {
  const classes = useStyles();
  const {
    isStarted,
    setIsStarted,
    setMoves,
    playerPlayer,
    setPlayerPlayer,
    playerComputer,
    setPlayerComputer,
    computerPlayer,
    setComputerPlayer,
    setHistoryToShow,
    setHistory,
    setIsX,
    setAfterHistory,
    moves,
    history,
    setWinner,
  } = useContext(GeneralContext);

  const handleClickPlayerPlayer = () => {
    if (!isStarted) {
      setIsStarted(true);
      setPlayerComputer(true);
      setComputerPlayer(true);
    } else {
      return;
    }
  };

  const handleClickPlayerComputer = () => {
    if (!isStarted) {
      setIsStarted(true);
      setComputerPlayer(true);
      setPlayerPlayer(true);
    } else {
      return;
    }
  };

  const handleClickComputerPlayer = () => {
    if (!isStarted) {
      setIsStarted(true);
      setPlayerPlayer(true);
      setPlayerComputer(true);

      const tempMoves = [...moves];
      const tempHistory = [...history];
      tempMoves[4] = "x";
      tempHistory.push(tempMoves);
      setHistory(tempHistory);
      setIsX(false);
      setMoves(tempMoves);
      setHistoryToShow(tempMoves);
    }
  };

  const handleClickNewGame = () => {
    setIsStarted(false);
    setPlayerPlayer(false);
    setPlayerComputer(false);
    setComputerPlayer(false);
    setMoves([null, null, null, null, null, null, null, null, null]);
    setHistoryToShow([null, null, null, null, null, null, null, null, null]);
    setHistory([[null, null, null, null, null, null, null, null, null]]);
    setIsX(true);
    setAfterHistory(false);
    setWinner(null);
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        className="margin-table margin-table-left"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={handleClickPlayerPlayer}
          variant="contained"
          disabled={playerPlayer}
          className="margin-table-left"
        >
          Player/Player
        </Button>
      </ButtonGroup>
      <ButtonGroup
        className="margin-table-left"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={handleClickPlayerComputer}
          variant="contained"
          disabled={playerComputer}
          className="margin-table-left"
        >
          Player/Computer
        </Button>
      </ButtonGroup>
      <ButtonGroup
        className="margin-table-left"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={handleClickComputerPlayer}
          variant="contained"
          disabled={computerPlayer}
          className="margin-table-left"
        >
          Computer/Player
        </Button>
      </ButtonGroup>
      <ButtonGroup
        className="margin-table-left"
        color="inherit"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={handleClickNewGame}
          variant="contained"
          disabled={false}
          className="margin-table-left game-color"
        >
          Start New Game
        </Button>
      </ButtonGroup>
      
    </div>
  );
};
