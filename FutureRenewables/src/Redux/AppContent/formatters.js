
import accountUtils from 'src/Common/account';

const coordinates = [
  {
    latitude: -26.8833514,
    longitude: 150.7383817,
  },
  {
    latitude: -26.7502014,
    longitude: 150.5923164,
  },
  {
    latitude: -35.3621025,
    longitude: 143.4533884,
  },
  {
    latitude: -35.367175,
    longitude: 143.6967643,
  },
];


export const formatSolarFarm = (itemInp) => {
  const item = itemInp;
  const { longitude, latitude } = item;

  item.coordinate = {
    latitude,
    longitude,
  };

  if (!item.percentComplete) {
    item.percentComplete = 100;
  }

  return item;
};

export const formatAccounts = data => ({
  ...data,
  complete: (data.status === accountUtils.STATUS.UNITS_ISSUED),
});
