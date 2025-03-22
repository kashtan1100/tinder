import Storage from './localstorage.service';
import { isPlatform } from '@ionic/vue';
import { StatusBar as CapacitorStatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';

const DARK_MODE_CLASS = 'dark-mode';

export default class ThemeService {
  static async toggleDarkMode(isDark = true, needUpdate = true) {
    if (needUpdate) Storage.setItem(DARK_MODE_CLASS, isDark.toString());
    document.body.classList.toggle(DARK_MODE_CLASS, isDark);

    if (isPlatform('capacitor')) {
      if (isDark) {
        // iOS only
        await CapacitorStatusBar.setStyle({
          style: StatusBarStyle.Dark,
        });

        // Android only
        await CapacitorStatusBar.setBackgroundColor({
          color: '#000000',
        });
      } else {
        // iOS only
        await CapacitorStatusBar.setStyle({
          style: StatusBarStyle.Light,
        });

        // Android only
        await CapacitorStatusBar.setBackgroundColor({
          color: '#ffffff',
        });
      }
    }
  }

  static async getCurrentSetting() {
    const value = await Storage.getItem(DARK_MODE_CLASS);
    return value === 'true';
  }

  static useAutoDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkMode(prefersDark.matches);
    prefersDark.addEventListener('change', (event) => this.toggleDarkMode(event.matches));
  }

  static async restore() {
    const currentSetting = await this.getCurrentSetting();
    this.toggleDarkMode(currentSetting, false);
  }
}
