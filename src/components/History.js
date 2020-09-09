import React, { useContext } from "react";
import { GeneralContext } from "./context/generalContext";
import { v4 as uuidv4 } from "uuid";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const History = () => {
  const {
    history,
    setMoves,
    setAfterHistory,
    setHistoryToShow,
    setIsX,
    winner,
  } = useContext(GeneralContext);

  const gridHistory = [];

  const handleClickButton = (index) => {
    const tempHistory = history[index];
    let count = 0;
    for (let i = 0; i < tempHistory.length; i++) {
      if (tempHistory[i]) {
        count++;
      }
    }
    if (count % 2 === 0) {
      setIsX(true);
    } else {
      setIsX(false);
    }
    setMoves([history[index]]);
    setAfterHistory(true);
    setHistoryToShow(history[index]);
  };

  for (let i = 0; i < history.length; i++) {
    if (i > 0) {
      gridHistory.push(
        <Grid key={uuidv4()} item xs={12}>
          <Typography align="center">
            <Button onClick={() => handleClickButton(i)}>
              <Typography align="right">#move {i}</Typography>
            </Button>
          </Typography>
        </Grid>
      );
    }
  }
  if (winner) {
    gridHistory.push(
      <Grid key={uuidv4()} item xs={12}>
        <Typography align="center">{winner}</Typography>{" "}
      </Grid>
    );
  }
  return <Grid container>{gridHistory}</Grid>;
};
