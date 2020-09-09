//  // o o null
//  if (
//     winVariants[i][0] === "o" &&
//     winVariants[i][1] === "o" &&
//     winVariants[i][2] === null
//   ) {
//     tempMoves[2] = "o";
//     tempHistory.push(tempMoves);
//     setHistory(tempHistory);
//     setIsX(true);
//     setMoves(tempMoves);
//     setHistoryToShow(tempMoves);
//   }
//   // o null o
//   if (
//     winVariants[i][0] === "o" &&
//     winVariants[i][1] === null &&
//     winVariants[i][2] === "o"
//   ) {
//     tempMoves[1] = "o";
//     tempHistory.push(tempMoves);
//     setHistory(tempHistory);
//     setIsX(true);
//     setMoves(tempMoves);
//     setHistoryToShow(tempMoves);
//   }

//   // null o  o
//   if (
//     winVariants[i][0] === null &&
//     winVariants[i][1] === "o" &&
//     winVariants[i][2] === "o"
//   ) {
//     tempMoves[0] = "o";
//     tempHistory.push(tempMoves);
//     setHistory(tempHistory);
//     setIsX(true);
//     setMoves(tempMoves);
//     setHistoryToShow(tempMoves);
//   }