export const accountsSelector = (state) => state.appContent.accounts || [];

export const impactStatsSelector = (state) => state.appContent.impactStats || [];

export const investmentsSelector = (state) => state.appContent.investments || [];

export const latestSelector = (state) => state.appContent.latest || [];

export const updatesSelector = (state) => state.appContent.updates || [];

export const solarFarmsSelector = (state) => state.appContent.solarFarms || [];

export const unitPricesSelector = (state) => state.appContent.unitPrices || [];

export const userSelector = (state) => state.appContent.user || {};

export const featuredSolarFarmSelector = (state) => {
  const { featuredSolarFarm } = state.appContent;

  if (!featuredSolarFarm) {
    return null;
  }

  const farms = solarFarmsSelector(state);

  const res = farms.find((item) => {
    const idItemMatch = item.id.match(/\d+/);
    if (idItemMatch) {
      const idItem = idItemMatch[0];

      return idItem === featuredSolarFarm.id;
    }

    return false;
  });

  return res;
};

export const getAccountByIdSelector = (state, id) => {
  const { accounts } = state.appContent;
  let res = null;

  if (!accounts || !Array.isArray(accounts)) {
    return res;
  }

  res = accounts.find((item) => item.id === id);

  return res;
};
