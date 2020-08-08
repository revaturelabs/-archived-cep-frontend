import React from 'react';
import Spider from './spidergraph/MySpiderGraphPage'
import { Card, CardHeader, CardContent, Grid } from '@material-ui/core';

function AssociateListItem(props: any) {

  const {batch, associate} = props;
  return (
    <Grid item sm={6}>
      <Card>
        <CardHeader style={{ backgroundColor: "#72A4C2", color: "#FFF" }} title={`${associate.associate.firstName} ${associate.associate.lastName}`} />
        <CardContent>
          <p>{`Training Status: ${associate.trainingStatus}`}</p>
          <Spider batchId={batch} associateEmail={associate.associate.email} />
        </CardContent>      
      </Card>
    </Grid>
  )
}

export default AssociateListItem;
