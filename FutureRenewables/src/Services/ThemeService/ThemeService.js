
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

    console.log('!!!themeservice', {  });
  }

  setDark() {
    this.theme = 'dark';
  }

  setLight() {
    this.theme = 'light';
  }

  isDark() {
    console.log('!!!this.theme', this.theme);
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
