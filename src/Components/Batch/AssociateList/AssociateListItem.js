import React from 'react';
import Spider from './spidergraph/MySpiderGraphPage'

function AssociateListItem({ batch, associate }) {
  return (
    <div>
      <div>
        <h3>{`${associate.associate.firstName} ${associate.associate.lastName}`}</h3>
        <p>{`Training Status: ${associate.trainingStatus}`}</p>
      </div>
      <Spider batchId={batch} associateEmail={associate.associate.email} />
    </div>
  )
}

export default AssociateListItem;
