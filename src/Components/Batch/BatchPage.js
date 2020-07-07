import React, { useState } from 'react';
import GetBatchDetails from "./GetBatches";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function BatchPage() {
  const [batch, setBatch] = useState({/*TODO: Set up default data*/});

  //TODO: Get request for batch information and setBatch

  return (
    <div>
      <Grid item sm={2}>
        <Paper>
          <h2>Batches Available</h2>
          <GetBatchDetails/>
        </Paper>

      </Grid>
      <Grid item sm={10}>
        
      </Grid>
  
    </div>
  );
}

export default BatchPage;
