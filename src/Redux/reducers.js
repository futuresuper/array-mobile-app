
import NavReducer from './Nav';
import AuthReducer from './Auth';
import AccountReducer from './Account';
import AppContentReducer from './AppContent';
import ThemeReducer from './Theme';

export default {
  navigationCard: NavReducer,
  auth: AuthReducer,
  appContent: AppContentReducer,
  account: AccountReducer,
  theme: ThemeReducer,
};
