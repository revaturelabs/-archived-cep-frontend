import React, { useState } from 'react';

import AssociateList from './AssociateList/AssociateList';

function BatchPage() {
  const [batch, setBatch] = useState({/*TODO: Set up default data*/});

  //TODO: Get request for batch information and setBatch

  return (
    <div>
      <AssociateList />
    </div>
  );
}

export default BatchPage;
