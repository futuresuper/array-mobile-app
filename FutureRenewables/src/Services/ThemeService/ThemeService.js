
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
    console.log('!!!dark', {  });
  }

  isDark() {
    console.log('!!!this.theme', this.theme);
    return (this.theme === 'dark');
  }
}

export default new ThemeService();
