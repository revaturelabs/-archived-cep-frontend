import React, { useState, useEffect } from 'react';
import GetBatchDetails from "./GetBatches";
import SimpleModal from '../Common/Modal';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import AssociateList from './AssociateList/AssociateList';
import { useSelector } from 'react-redux';

function BatchPage() {
  const [batches, setBatches] = useState([]);
  const [batchToShow, setBatchToShow] = useState({});
  
  const batch = useSelector(state => state.batchReducer);

  //TODO: Get request for batch information and setBatch
  useEffect(() => {
    Axios.get("http://localhost:8080/UB/batchesbyuser", {
      params: {
        userId: 1,
      },
    })
      .then((result) => {
        setBatches(result.data);
      })
      .catch((err) => console.log("error batch:" + err));
    
    setBatchToShow(batch);
  }, []);

  return (
    <Grid container>
      <Grid item sm={2}>
        <Paper>
          <h2>Batches Available</h2>
          <GetBatchDetails batches={batches}/>
        </Paper>

      </Grid>
      <Grid item sm={10}>
        <SimpleModal />
        <AssociateList batch={batchToShow} />
      </Grid>
    </Grid>
  );
}

export default BatchPage;
