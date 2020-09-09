import React from 'react';
import './App.css';

import {Players} from "./components/Players";
import {Square} from "./components/Square";
import {History} from "./components/History";





import Grid from "@material-ui/core/Grid"

export const  App = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={1}>
        <Players />
      </Grid>
      <Grid item xs={12} md={4}>
        <Square />
      </Grid>
      <Grid className="margin-table" item xs={12} md={2}>
        <History  />        
      </Grid>
    </Grid>
      
    
  );
}

export default App;
