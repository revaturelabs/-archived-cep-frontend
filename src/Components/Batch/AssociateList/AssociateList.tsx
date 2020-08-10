import React, { ReactElement } from 'react';

import AssociateListItem from './AssociateListItem';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

interface associateINF
{
  email: string;
  firstName: string;
  lastName: string;
}
function AssociateList(props: any): ReactElement {

  const {batch} = props;

  const associates: associateINF[] = useSelector((state: any) => state.batchReducer.associateAssignments);

  return (
    <Grid container direction="row" spacing={3}>
      {associates.map((associate: associateINF, index: number) => <AssociateListItem key={index} batch={batch.batchId} associate={associate} />)}
    </Grid>
  );
}

export default AssociateList;
