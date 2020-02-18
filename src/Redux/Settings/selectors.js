
import settingsUtils from 'src/Common/settings';

/* eslint-disable import/prefer-default-export */
export const settingsIsTestModeSelector = (state) => (state.settings.appMode === settingsUtils.APP_MODE.TEST);
