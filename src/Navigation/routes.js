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
      showBackButton: false,
    },
  },
  [routeNames.BUILD_YOUR_SAVING]: {
    screen: screens.BuildYourSaving,
  },
  [routeNames.BUILD_YOUR_IMPACT]: {
    screen: screens.BuildYourImpact,
  },
  [routeNames.BUILD_MOVEMENT]: {
    screen: screens.BuildMovement,
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
    params: {
      title: 'Account Type',
    },
  },
  [routeNames.ABOUT_APP_FORM]: {
    screen: screens.AboutAppForm,
    params: {
      title: 'About',
    },
  },
  [routeNames.IMPORTANT_INFO]: {
    screen: screens.ImportantInfo,
    params: {
      title: 'Important Info',
    },
  },
  [routeNames.NAME]: {
    screen: screens.Name,
  },
  [routeNames.EMAIL]: {
    screen: screens.Email,
  },
  [routeNames.DATE_OF_BIRTH]: {
    screen: screens.DateOfBirth,
    params: {
      title: 'Birth Date',
    },
  },
  [routeNames.HOME_ADDRESS]: {
    screen: screens.HomeAddress,
    params: {
      title: 'Home Address',
    },
  },
  [routeNames.PLACE_OF_BIRTH]: {
    screen: screens.PlaceOfBirth,
    params: {
      title: 'Birth Place',
    },
  },
  [routeNames.INITIAL_INVESTMENT_AMOUNT]: {
    screen: screens.InitialInvestmentAmount,
    params: {
      title: 'Initial Investment',
    },
  },
  [routeNames.ELECTRONIC_FUND_TRANSFER_INFO]: {
    screen: screens.ElectronicFundTransferInfo,
    params: {
      title: 'Deposit Details',
    },
  },
  [routeNames.ELECTRONIC_FUND_TRANSFER_DETAILS]: {
    screen: screens.ElectronicFundTransferDetails,
    params: {
      title: 'Transfer Details',
    },
  },
  [routeNames.BANK_ACCOUNT]: {
    screen: screens.BankAccount,
    params: {
      title: 'Bank Account',
    },
  },
  [routeNames.ID_CHECK_ONLINE]: {
    screen: screens.IdCheckOnline,
    params: {
      title: 'ID Check',
    },
  },
  [routeNames.SOURCE_OF_FUNDS]: {
    screen: screens.SourceOfFunds,
    params: {
      title: 'Funds source',
    },
  },
  [routeNames.PURPOSE_OF_INVESTMENT]: {
    screen: screens.PurposeOfInvestment,
    params: {
      title: 'Investment Purpose',
    },
  },
  [routeNames.OCCUPATION]: {
    screen: screens.Occupation,
    params: {
      title: 'Occupation',
    },
  },
  [routeNames.PEP]: {
    screen: screens.Pep,
    params: {
      title: 'PEP Status',
    },
  },
  [routeNames.PEP_DESCRIPTION]: {
    screen: screens.PepDescription,
    params: {
      title: 'PEP Description',
    },
  },
  [routeNames.TAX_NUMBERS]: {
    screen: screens.TaxNumbers,
    params: {
      title: 'Tax Numbers',
    },
  },
  [routeNames.FINAL_CONFIRMATION]: {
    screen: screens.FinalConfirmation,
    params: {
      title: 'Confirmation',
    },
  },
  [routeNames.NOTIFICATIONS]: {
    screen: screens.Notifications,
    params: {
      title: 'Notifications',
    },
  },
  [routeNames.THANKS_SHARE]: {
    screen: screens.ThanksShare,
    params: {
      title: 'Share',
    },
  },
  [routeNames.ARTIST_NAME]: {
    screen: screens.ArtistName,
    params: {
      title: 'Artist / Industry Participant Name',
    },
  },
  [routeNames.WHATS_NEXT]: {
    screen: screens.WhatsNext,
  },
  [routeNames.ID_CHECK]: {
    screen: screens.IdCheck,
    params: {
      protected: true,
    },
  },
  [routeNames.ID_CHECK_DETAILS]: {
    screen: screens.IdCheckDetails,
    params: {
      title: 'ID Check',
    },
    ...tabCardOptions,
  },
  [routeNames.ID_CHECK_DRIVERS_LICENCE]: {
    screen: screens.IdCheckDriversLicence,
    params: {
      title: 'Drivers Licence',
    },
    ...tabCardOptions,
  },
  [routeNames.ID_CHECK_AUSTRALIAN_PASSPORT]: {
    screen: screens.IdCheckAustralianPassport,
    params: {
      title: 'Australian Passport',
    },
    ...tabCardOptions,
  },
  [routeNames.ID_CHECK_MEDICARE_CARD]: {
    screen: screens.IdCheckMedicareCard,
    params: {
      title: 'Medicare Card',
    },
    ...tabCardOptions,
  },
  [routeNames.POST_US_CERTIFIED_ID]: {
    screen: screens.PostUsCertifiedId,
    params: {
      title: 'Certified ID',
    },
  },
  [routeNames.JOIN_FUTURE]: {
    screen: screens.JoinFuture,
    params: {
      title: 'Join Future Super',
    },
  },
  [routeNames.JOIN_FUTURE_FORM]: {
    screen: screens.JoinFutureForm,
    params: {
      title: 'Join Future Super',
    },
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
  [routeNames.TALK_US]: {
    screen: screens.TalkUs,
    params: {
      noHeader: true,
      // routeReset: true,
    },
  },
  [routeNames.ALL_INVESTMENTS]: {
    screen: screens.AllInvestments,
    params: {
      title: 'All investments',
      headerTitleStyle: {
        fontSize: 24,
      },
    },
  },
  [routeNames.PERSONAL_DETAILS]: {
    screen: screens.PersonalDetails,
    params: {
      title: 'Personal details',
      headerTitleStyle: sg.tabProfileTitle,
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
  [routeNames.TAB_IMPACT]: {
    screen: screens.TabImpact,
  },
  [routeNames.TAB_PROFILE]: {
    screen: screens.TabProfile,
  },
};

const tabBarModalRoutes = {
  example: {
    screen: screens.Example,
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

  [routeNames.REFER_FRIEND]: {
    screen: screens.ReferFriend,
    params: {
      title: 'Refer a friend',
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
  [routeNames.ID_CHECK_FINISH]: {
    screen: screens.IdCheckFinish,
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
  [routeNames.MANAGE_ACCOUNT_DETAILS_EDIT]: {
    screen: screens.ManageAccountDetailsEdit,
    params: {
      headerTitleStyle: sg.tabProfileTitle,
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
  // eslint-disable-next-line no-restricted-syntax, no-unused-vars
  for (const keyRoute in routes) {
    if ({}.hasOwnProperty.call(routes, keyRoute)) {
      const routeInfo = routes[keyRoute];

      // eslint-disable-next-line no-restricted-syntax, no-unused-vars
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
