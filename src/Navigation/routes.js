import { isNil, omit } from 'lodash';

import * as screens from 'src/Screens';
import ScreensList from 'src/Screens/ScreensList';

import { sg } from 'src/Styles';

import { noHeader, signOptions, tabCardOptions } from './navigationOptions';

import routeNames from './routeNames';

const formatRoutes = (routesInp) => {
  const routes = routesInp;

  Object.keys(routes).forEach((key) => {
    const item = routes[key];
    const { params } = item;
    let navigationOptions;

    if (params && !isNil(params.noHeader) && params.noHeader) {
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
});

const signDataRoutes = formatRoutes({
  [routeNames.ACCOUNTS]: {
    screen: screens.Accounts,
    params: {
      showBackButton: false,
    },
  },
  [routeNames.PERSONAL_DETAILS_ALREADY_SUBMITTED]: {
    screen: screens.PersonalDetailsAlreadySubmitted,
  },
  [routeNames.ACCOUNT_TYPE]: {
    screen: screens.AccountType,
  },
  [routeNames.ABOUT_APP_FORM]: {
    screen: screens.AboutAppForm,
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
  [routeNames.PLACE_OF_BIRTH]: {
    screen: screens.PlaceOfBirth,
  },
  [routeNames.INITIAL_INVESTMENT_AMOUNT]: {
    screen: screens.InitialInvestmentAmount,
  },
  [routeNames.ELECTRONIC_FUND_TRANSFER_INFO]: {
    screen: screens.ElectronicFundTransferInfo,
  },
  [routeNames.ELECTRONIC_FUND_TRANSFER_DETAILS]: {
    screen: screens.ElectronicFundTransferDetails,
  },
  [routeNames.BANK_ACCOUNT]: {
    screen: screens.BankAccount,
  },
  [routeNames.ID_CHECK_ONLINE]: {
    screen: screens.IdCheckOnline,
  },
  [routeNames.SOURCE_OF_FUNDS]: {
    screen: screens.SourceOfFunds,
  },
  [routeNames.PURPOSE_OF_INVESTMENT]: {
    screen: screens.PurposeOfInvestment,
  },
  [routeNames.OCCUPATION]: {
    screen: screens.Occupation,
  },
  [routeNames.PEP]: {
    screen: screens.Pep,
  },
  [routeNames.PEP_DESCRIPTION]: {
    screen: screens.PepDescription,
  },
  [routeNames.TAX_NUMBERS]: {
    screen: screens.TaxNumbers,
  },
  [routeNames.FINAL_CONFIRMATION]: {
    screen: screens.FinalConfirmation,
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
  [routeNames.ID_CHECK]: {
    screen: screens.IdCheck,
  },
  [routeNames.ID_CHECK_DETAILS]: {
    screen: screens.IdCheckDetails,
    params: {},
    ...tabCardOptions,
  },
  [routeNames.ID_CHECK_DRIVERS_LICENCE]: {
    screen: screens.IdCheckDriversLicence,
    params: {},
    ...tabCardOptions,
  },
  [routeNames.ID_CHECK_AUSTRALIAN_PASSPORT]: {
    screen: screens.IdCheckAustralianPassport,
    params: {},
    ...tabCardOptions,
  },
  [routeNames.ID_CHECK_MEDICARE_CARD]: {
    screen: screens.IdCheckMedicareCard,
    params: {},
    ...tabCardOptions,
  },
  [routeNames.POST_US_CERTIFIED_ID]: {
    screen: screens.PostUsCertifiedId,
  },
  [routeNames.JOIN_FUTURE]: {
    screen: screens.JoinFuture,
  },
  [routeNames.JOIN_FUTURE_FORM]: {
    screen: screens.JoinFutureForm,
    params: {},
  },
});

const localAuthRoutes = formatRoutes({
  [routeNames.BIOMETRICS_SETUP]: {
    screen: screens.BiometricsSetup,
    params: {},
  },
  [routeNames.PIN_SETUP]: {
    screen: screens.PinSetup,
    params: {},
  },
  [routeNames.BIOMETRICS_VALIDATION]: {
    screen: screens.BiometricsValidation,
    params: {},
  },
  [routeNames.PIN_VALIDATION]: {
    screen: screens.PinValidation,
    params: {},
  },
  [routeNames.LOCAL_AUTH_HANDLER]: {
    screen: screens.LocalAuthHandler,
    params: {},
  },
});

const mainRoutes = formatRoutes({
  [routeNames.APPLICATION_TYPE]: {
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
  [routeNames.REGULAR_INVESTMENT_AMOUNT]: {
    screen: screens.RegularInvestmentAmount,
  },
  DirectDebitAuth: {
    screen: screens.DirectDebitAuth,
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

const tabBarModalRootRoutes = {
  example: {
    screen: screens.Example,
  },
  [routeNames.SOLAR_FARM]: {
    screen: screens.SolarFarm,
    params: {
      noHeader: true,
      // routeReset: true,
    },
  },
};

const tabRoutes = {
  [routeNames.TAB_HOME]: {
    screen: screens.TabHome,
  },
  [routeNames.TAB_ACTIVITY]: {
    screen: screens.TabActivity,
  },
  [routeNames.SOLAR_FARMS_LIST]: {
    screen: screens.SolarFarmsList,
  },
  [routeNames.TAB_PROFILE]: {
    screen: screens.TabProfile,
  },
};

const tabBarModalRoutes = {
  [routeNames.DEPOSIT_WITHDRAW]: {
    screen: screens.DepositWithdraw,
  },
  [routeNames.DEPOSIT_WITHDRAW_DONE]: {
    screen: screens.DepositWithdrawDone,
    params: {
      backButton: true,
    },
  },
  [routeNames.WITHDRAW]: {
    screen: screens.Withdraw,
    params: {
      title: 'Withdraw',
    },
  },
};

const tabBarScreensRoutes = {};

const tabCardRoutes = {
  [routeNames.SOLAR_FARMS_MAP]: {
    screen: screens.SolarFarmsMap,
    params: {
      noHeader: true,
    },
    navigationOptions: {
      header: null,
    },
  },
  [routeNames.MANAGE_ACCOUNTS]: {
    screen: screens.ManageAccounts,
    params: {
      routeReset: true,
      title: 'Manage Accounts',
      headerTitleStyle: sg.tabProfileTitle,
    },
    ...tabCardOptions,
  },
  [routeNames.MANAGE_ACCOUNT_DETAILS]: {
    screen: screens.ManageAccountDetails,
    params: {
      headerTitleStyle: sg.tabProfileTitle,
    },
    ...tabCardOptions,
  },
  [routeNames.PERSONAL_DETAILS]: {
    screen: screens.PersonalDetails,
    params: {
      title: 'Personal details',
      routeReset: true,
      headerTitleStyle: sg.tabProfileTitle,
    },
    ...tabCardOptions,
  },
  [routeNames.REFER_FRIEND]: {
    screen: screens.ReferFriend,
    params: {
      title: 'Refer a friend',
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
      headerTitleStyle: sg.tabProfileTitle,
    },
    ...tabCardOptions,
  },
  [routeNames.ALL_INVESTMENTS]: {
    screen: screens.AllInvestments,
    params: {
      routeReset: true,
      title: 'All investments',
      headerTitleStyle: {
        fontSize: 24,
      },
    },
    ...tabCardOptions,
  },
  [routeNames.ID_CHECK_FINISH]: {
    screen: screens.IdCheckFinish,
    params: {
      routeReset: true,
    },
    ...tabCardOptions,
  },
};

const tmpRoutes = {
  [routeNames.SCREENS_LIST]: {
    screen: ScreensList,
  },
};

const routes = {
  signRoutes,
  signDataRoutes,
  localAuthRoutes,
  mainRoutes,
  tabBarModalRootRoutes,
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
            screenInfo = omit(screenInfo, ['screen', 'navigationOptions']);
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
  signDataRoutes,
  localAuthRoutes,
  mainRoutes,
  tabBarModalRootRoutes,
  tabRoutes,
  tabBarModalRoutes,
  tabBarScreensRoutes,
  tabCardRoutes,
  tmpRoutes,
};
