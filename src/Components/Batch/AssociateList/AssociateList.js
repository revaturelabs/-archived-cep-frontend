import React from 'react';

import AssociateListItem from './AssociateListItem';
import { useSelector } from 'react-redux';

function AssociateList({ batch }) {
  const associates = useSelector(state => state.batchReducer.associateAssignments);

  return (
    <div>
      {associates.map(associate => <AssociateListItem key={batch.batchId} batch={batch.batchId} associate={associate} />)}
    </div>
  );
}

export default AssociateList;
