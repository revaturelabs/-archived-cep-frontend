import React from 'react';

import AssociateListItem from './AssociateListItem';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

function AssociateList({ batch }) {
  const associates = useSelector(state => state.batchReducer.associateAssignments);

  return (
    <Grid container direction="row" spacing={3}>
      {/* Renders all associate cards */}
      {associates.map(associate => <AssociateListItem key={batch.batchId} batch={batch.batchId} associate={associate} />)}
    </Grid>
  );
}

export default AssociateList;
