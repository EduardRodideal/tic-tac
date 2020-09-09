import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  //if is true, the next to go is x
  const [isX, setIsX] = useState(true);
  //the history of all moves
  const [moves, setMoves] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  //if true the game is started
  const [isStarted, setIsStarted] = useState(false);
  //holds the history of all moves
  const [history, setHistory] = useState([
    [null, null, null, null, null, null, null, null, null],
  ]);
  //if true we show the history
  const [afterHistory, setAfterHistory] = useState(false);
  //this history will be shown on the board
  const [historyToShow, setHistoryToShow] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [playerPlayer, setPlayerPlayer] = useState(false);
  const [playerComputer, setPlayerComputer] = useState(false);
  const [computerPlayer, setComputerPlayer] = useState(false);
  const [winner, setWinner] = useState(null);

  return (
    <GeneralContext.Provider
      value={{
        isX,
        setIsX,
        moves,
        setMoves,
        isStarted,
        setIsStarted,
        history,
        setHistory,
        afterHistory,
        setAfterHistory,
        historyToShow,
        setHistoryToShow,
        playerPlayer,
        setPlayerPlayer,
        playerComputer,
        setPlayerComputer,
        computerPlayer,
        setComputerPlayer,
        winner,
        setWinner,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
