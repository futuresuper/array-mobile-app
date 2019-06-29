
import {
  themeLight,
  themeDark,
} from 'src/Theme';

class ThemeService {
  constructor() {
    this.init = this.init.bind(this);

    if (!ThemeService.instance) {
      ThemeService.instance = this;
    }

    return ThemeService.instance;
  }

  init() {
    this.theme = 'light';
  }

  setDark() {
    this.theme = 'dark';
  }

  setLight() {
    this.theme = 'light';
  }

  isDark() {
    return (this.theme === 'dark');
  }

  getTheme() {
    if (this.isDark()) {
      return themeDark;
    }

    return themeLight;
  }
}

export default new ThemeService();
