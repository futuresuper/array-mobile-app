
import _ from 'lodash';

import * as screens from 'src/Screens';
import FirstPage from 'src/Screens/FirstPage';

import {
  noHeader,
  signOptions,
  tabCardOptions,
} from './navigationOptions';

import routeNames from './routeNames';

const formatRoutes = (routesInp) => {
  const routes = routesInp;

  Object.keys(routes).forEach((key) => {
    const item = routes[key];
    const { params } = item;
    let navigationOptions;

    if (params && !_.isNil(params.noHeader) && params.noHeader) {
      navigationOptions = noHeader;
    } else {
      navigationOptions = signOptions;
    }

    routes[key].navigationOptions = navigationOptions;
  });

  return routes;
};

const signRoutes = formatRoutes({
  [routeNames.APP_LANDING]: {
    screen: screens.AppLanding,
    params: {
      noHeader: true,
    },
  },
  [routeNames.BUILD_YOUR_SAVING]: {
    screen: screens.BuildYourSaving,
  },
  [routeNames.BUILD_YOUR_IMPACT]: {
    screen: screens.BuildYourImpact,
    params: {
      noHeader: true,
    },
  },
  [routeNames.BUILD_MOVEMENT]: {
    screen: screens.BuildMovement,
    params: {
      noHeader: true,
    },
  },
  [routeNames.SIGN_UP_LOGIN]: {
    screen: screens.SignUpLogin,
  },
  [routeNames.SMS_CODE]: {
    screen: screens.SmsCode,
  },
  [routeNames.ACCOUNT_TYPE]: {
    screen: screens.AccountType,
  },
  [routeNames.NAME]: {
    screen: screens.Name,
  },
  [routeNames.EMAIL]: {
    screen: screens.Email,
  },
  [routeNames.DATE_OF_BIRTH]: {
    screen: screens.DateOfBirth,
  },
  [routeNames.HOME_ADDRESS]: {
    screen: screens.HomeAddress,
  },
  [routeNames.NOTIFICATIONS]: {
    screen: screens.Notifications,
  },
  [routeNames.THANKS_SHARE]: {
    screen: screens.ThanksShare,
  },
  [routeNames.ARTIST_NAME]: {
    screen: screens.ArtistName,
  },
});

const mainRoutes = formatRoutes({
  ApplicationType: {
    screen: screens.ApplicationType,
    params: {
      routeReset: true,
    },
  },
  Feed: {
    screen: screens.Feed,
    params: {
      noHeader: true,
    },
  },
  InitialInvestmentAmount: {
    screen: screens.InitialInvestmentAmount,
  },
  RegularInvestmentAmount: {
    screen: screens.RegularInvestmentAmount,
  },
  BankAccount: {
    screen: screens.BankAccount,
  },
  DirectDebitAuth: {
    screen: screens.DirectDebitAuth,
  },
  SourceOfFunds: {
    screen: screens.SourceOfFunds,
  },
  PurposeOfInvestment: {
    screen: screens.PurposeOfInvestment,
  },
  OsTaxResident: {
    screen: screens.OsTaxResident,
  },
  TaxFileNumber: {
    screen: screens.TaxFileNumber,
  },
  MultiPartyNextSteps: {
    screen: screens.MultiPartyNextSteps,
  },
  JointInvestorDetails: {
    screen: screens.JointInvestorDetails,
  },
  FinalConfirmation: {
    screen: screens.FinalConfirmation,
  },
  JoinSuper: {
    screen: screens.JoinSuper,
  },
  FeatApplicationType: {
    screen: screens.FeatApplicationType,
  },
  JointNames: {
    screen: screens.JointNames,
  },
  ChildsName: {
    screen: screens.ChildsName,
  },
  AdultForChildAppType: {
    screen: screens.AdultForChildAppType,
  },
  PaperApp: {
    screen: screens.PaperApp,
  },
  EntityIsFinancialInstitution: {
    screen: screens.EntityIsFinancialInstitution,
  },
  AbnOrAcn: {
    screen: screens.AbnOrAcn,
  },
  SoleTraderConfirmation: {
    screen: screens.SoleTraderConfirmation,
  },
  EntityContactDetails: {
    screen: screens.EntityContactDetails,
  },
  CompanyDirectors: {
    screen: screens.CompanyDirectors,
  },
  EntityAddress: {
    screen: screens.EntityAddress,
  },
  EntityOverseasTaxStatus: {
    screen: screens.EntityOverseasTaxStatus,
  },
  EntityTaxFileNumber: {
    screen: screens.EntityTaxFileNumber,
  },
  BeneficialOwners: {
    screen: screens.BeneficialOwners,
  },
  Partners: {
    screen: screens.Partners,
  },
});

const mainModalRoutes = {
  example: {
    screen: screens.Example,
  },
};

const tabRoutes = {
  [routeNames.TAB_HOME]: {
    screen: screens.TabHome,
  },
  [routeNames.TAB_ACTIVITY]: {
    screen: screens.TabActivity,
  },
  [routeNames.TAB_FARMS]: {
    screen: screens.TabFarms,
    params: {
      noHeader: true,
    },
  },
  [routeNames.TAB_PROFILE]: {
    screen: screens.TabProfile,
  },
};

const tabModalRoutes = {
  [routeNames.DEPOSIT_WITHDRAW]: {
    screen: screens.DepositWithdraw,
  },
  [routeNames.DEPOSIT_WITHDRAW_DONE]: {
    screen: screens.DepositWithdrawDone,
    params: {
      backButton: true,
    },
  },
};

const tabCardRoutes = {
  [routeNames.SOLAR_FARM]: {
    screen: screens.SolarFarm,
    navigationOptions: {
      header: null,
    },
  },
  [routeNames.ARTICLE]: {
    screen: screens.Article,
    params: {
      routeReset: true,
    },
    ...tabCardOptions,
  },
  [routeNames.MANAGE_ACCOUNTS]: {
    screen: screens.ManageAccounts,
    params: {
      routeReset: true,
      title: 'Manage Accounts',
    },
    ...tabCardOptions,
  },
  [routeNames.MANAGE_ACCOUNT_DETAILS]: {
    screen: screens.ManageAccountDetails,
    ...tabCardOptions,
  },
  [routeNames.PERSONAL_DETAILS]: {
    screen: screens.PersonalDetails,
    params: {
      title: 'Personal details',
      routeReset: true,
    },
    ...tabCardOptions,
  },
  [routeNames.REFER_FRIEND]: {
    screen: screens.ReferFriend,
    params: {
      routeReset: true,
    },
    ...tabCardOptions,
  },
  [routeNames.TALK_US]: {
    screen: screens.TalkUs,
    params: {
      routeReset: true,
    },
    ...tabCardOptions,
  },
  [routeNames.JOIN_FUTURE_SUPER]: {
    screen: screens.JoinFutureSuper,
    params: {
      title: 'Join Future Super',
      routeReset: true,
    },
    ...tabCardOptions,
  },
};

const tmpRoutes = {
  [routeNames.FIRST_PAGE]: {
    screen: FirstPage,
  },
};

const routes = {
  signRoutes,
  mainRoutes,
  mainModalRoutes,
  tabRoutes,
  tabCardRoutes,
};

const getRouteInfo = (findScreenKey) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const keyRoute in routes) {
    if ({}.hasOwnProperty.call(routes, keyRoute)) {
      const routeInfo = routes[keyRoute];

      // eslint-disable-next-line no-restricted-syntax
      for (const keyScreen in routeInfo) {
        if ({}.hasOwnProperty.call(routeInfo, keyScreen)) {
          let screenInfo = routeInfo[keyScreen];

          if (findScreenKey === keyScreen) {
            screenInfo = _.omit(screenInfo, ['screen', 'navigationOptions']);
            if (!screenInfo.params) screenInfo.params = {};

            return screenInfo;
          }
        }
      }
    }
  }

  return null;
};

export {
  routes,
  getRouteInfo,
  signRoutes,
  mainRoutes,
  mainModalRoutes,
  tabRoutes,
  tabModalRoutes,
  tabCardRoutes,
  tmpRoutes,
};
