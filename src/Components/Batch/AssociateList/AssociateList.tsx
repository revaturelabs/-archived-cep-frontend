import React, { ReactElement } from 'react';

import AssociateListItem from './AssociateListItem';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

function AssociateList(props: any): ReactElement {

  const {batch} = props;

  const associates: any = useSelector((state: any) => state.batchReducer.associateAssignments);

  return (
    <Grid container direction="row" spacing={3}>
      {associates.map((associate: any) => <AssociateListItem key={batch.batchId} batch={batch.batchId} associate={associate} />)}
    </Grid>
  );
}

export default AssociateList;
