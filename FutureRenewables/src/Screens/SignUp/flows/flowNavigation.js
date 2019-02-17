
const getFlow = (applicationType) => {
  switch (applicationType) {
    case 'individual': {
      const flow = [
        'ApplicationType',
        'Name',
        'Email',
        'DateOfBirth',
        'HomeAddress',
        'SummaryAndConfirm',
        'Feed',
      ];
      return flow;
    }
    default: {
      return [];
    }
  }
};

const flowNext = (applicationType, currentPage) => {
  const flow = getFlow(applicationType);
  const indexCurrent = flow.indexOf(currentPage);
  const next = flow[indexCurrent + 1];
  return next;
};

export default flowNext;
