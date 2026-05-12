import { SettingsValueProps } from '../types';
import { getUiThemeSel } from '@/store/ui';
import { IAppState, TUiTheme } from '@/typeDefs';
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { localStorageGetItem } from 'src/utils/storage-available';

import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------
const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);
	const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );

  const [openDrawer, setOpenDrawer] = useState(false);

  const isArabic = localStorageGetItem('i18nextLng') === 'ar';

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [update]
  );

	// Theme
  const onChangeTheme = useCallback(
    (uiTheme: TUiTheme) => {
      update('themeMode', uiTheme === 'dark' ? 'light' : 'dark');
    },
    [update]
  );

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
			onChangeTheme,
			themeMode: uiTheme,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      reset,
      update,
      state,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
			onChangeTheme,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
