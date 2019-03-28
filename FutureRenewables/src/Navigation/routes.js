
import _ from 'lodash';

import {
  Home,
  SignUpLogin,
  SmsCode,
  Feed,
  ApplicationType,
  Name,
  Email,
  DateOfBirth,
  HomeAddress,
  InitialInvestmentAmount,
  RegularInvestmentAmount,
  BankAccount,
  DirectDebitAuth,
  SourceOfFunds,
  PurposeOfInvestment,
  OsTaxResident,
  TaxFileNumber,
  MultiPartyNextSteps,
  JointInvestorDetails,
  FinalConfirmation,
  JoinSuper,
  Accounts,
  FeatApplicationType,
  JointNames,
  ChildsName,
  AdultForChildAppType,
  PaperApp,
  EntityIsFinancialInstitution,
  AbnOrAcn,
  SoleTraderConfirmation,
  EntityContactDetails,
  CompanyDirectors,
  EntityAddress,
  EntityOverseasTaxStatus,
  EntityTaxFileNumber,
  BeneficialOwners,
  Partners,
  TabHome,
  TabActivity,
  DepositWithdraw,
  TabFarms,
  SolarFarm,
  DepositWithdrawDone,
  TabProfile,
  Example,
} from 'src/Screens';

import {
  noHeader,
  drawerOptions,
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
      navigationOptions = drawerOptions;
    }

    routes[key].navigationOptions = navigationOptions;
  });

  return routes;
};

const signRoutes = formatRoutes({
  Home: {
    screen: Home,
    params: {
      noHeader: true,
    },
  },
  SignUpLogin: {
    screen: SignUpLogin,
    params: {
      title: 'Sign Up or Login',
    },
  },
  SmsCode: {
    screen: SmsCode,
    params: {
      title: 'SMS code',
    },
  },
});

const mainRoutes = formatRoutes({
  Accounts: {
    screen: Accounts,
  },
  ApplicationType: {
    screen: ApplicationType,
    params: {
      routeReset: true,
    },
  },
  Feed: {
    screen: Feed,
    params: {
      noHeader: true,
    },
  },
  Name: {
    screen: Name,
  },
  Email: {
    screen: Email,
  },
  DateOfBirth: {
    screen: DateOfBirth,
  },
  HomeAddress: {
    screen: HomeAddress,
  },
  InitialInvestmentAmount: {
    screen: InitialInvestmentAmount,
  },
  RegularInvestmentAmount: {
    screen: RegularInvestmentAmount,
  },
  BankAccount: {
    screen: BankAccount,
  },
  DirectDebitAuth: {
    screen: DirectDebitAuth,
  },
  SourceOfFunds: {
    screen: SourceOfFunds,
  },
  PurposeOfInvestment: {
    screen: PurposeOfInvestment,
  },
  OsTaxResident: {
    screen: OsTaxResident,
  },
  TaxFileNumber: {
    screen: TaxFileNumber,
  },
  MultiPartyNextSteps: {
    screen: MultiPartyNextSteps,
  },
  JointInvestorDetails: {
    screen: JointInvestorDetails,
  },
  FinalConfirmation: {
    screen: FinalConfirmation,
  },
  JoinSuper: {
    screen: JoinSuper,
  },
  FeatApplicationType: {
    screen: FeatApplicationType,
  },
  JointNames: {
    screen: JointNames,
  },
  ChildsName: {
    screen: ChildsName,
  },
  AdultForChildAppType: {
    screen: AdultForChildAppType,
  },
  PaperApp: {
    screen: PaperApp,
  },
  EntityIsFinancialInstitution: {
    screen: EntityIsFinancialInstitution,
  },
  AbnOrAcn: {
    screen: AbnOrAcn,
  },
  SoleTraderConfirmation: {
    screen: SoleTraderConfirmation,
  },
  EntityContactDetails: {
    screen: EntityContactDetails,
  },
  CompanyDirectors: {
    screen: CompanyDirectors,
  },
  EntityAddress: {
    screen: EntityAddress,
  },
  EntityOverseasTaxStatus: {
    screen: EntityOverseasTaxStatus,
  },
  EntityTaxFileNumber: {
    screen: EntityTaxFileNumber,
  },
  BeneficialOwners: {
    screen: BeneficialOwners,
  },
  Partners: {
    screen: Partners,
  },
});

const mainModalRoutes = {
  example: {
    screen: Example,
  },
};

const tabRoutes = {
  [routeNames.TAB_HOME]: {
    screen: TabHome,
  },
  [routeNames.TAB_ACTIVITY]: {
    screen: TabActivity,
  },
  [routeNames.TAB_FARMS]: {
    screen: TabFarms,
    params: {
      noHeader: true,
    },
  },
  [routeNames.TAB_PROFILE]: {
    screen: TabProfile,
  },
};

const tabModalRoutes = {
  [routeNames.DEPOSIT_WITHDRAW]: {
    screen: DepositWithdraw,
  },
};

const tabCardRoutes = {
  [routeNames.SOLAR_FARM]: {
    screen: SolarFarm,
  },
  [routeNames.DEPOSIT_WITHDRAW_DONE]: {
    screen: DepositWithdrawDone,
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
};
