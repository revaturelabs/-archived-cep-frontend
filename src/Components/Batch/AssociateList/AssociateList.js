import React from 'react';

import AssociateListItem from './AssociateListItem';
import { useSelector } from 'react-redux';

function AssociateList() {
  const batchId = useSelector(state => state.batchReducer.batchId);
  const associates = useSelector(state => state.batchReducer.associateAssignments);

  return (
    <div>
      {associates.map(associate => <AssociateListItem batch={batchId} associate={associate} />)}
    </div>
  );
}

export default AssociateList;
