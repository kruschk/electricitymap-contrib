import { vsprintf } from 'sprintf-js';
import { useTranslation as useTranslationHook } from 'react-i18next';
import i18next from './i18n';

// Todo: We should get rid of vsprintf and use i18next interpolation instead
const translateWithTranslator = (translator, key, ...args) => {
  const translation = translator(key, '');
  if (args.length > 0) {
    return vsprintf(translation, args);
  }
  return translation;
};

// Used for translation outside of React components
export const translate = (key, ...args) => translateWithTranslator(i18next.t, key, ...args);

// Hook for translations inside React components
export const useTranslation = () => {
  const { t, i18n } = useTranslationHook();
  const __ = (key, ...args) => translateWithTranslator(t, key, ...args);
  return { __, i18n };
};

export const translateIfExists = (key) => {
  return i18next.exists(key) ? i18next.t(key) : '';
};

export function getFullZoneName(zoneCode) {
  const zoneName = translate(`zoneShortName.${zoneCode}.zoneName`);
  if (!zoneName) {
    return zoneCode;
  }
  const countryName = translate(`zoneShortName.${zoneCode}.countryName`);
  if (!countryName) {
    return zoneName;
  }
  return `${zoneName} (${countryName})`;
}

export function getShortZoneName(zoneCode, limit = 40) {
  const zoneName = translate(`zoneShortName.${zoneCode}.zoneName`);
  if (!zoneName) {
    return zoneCode;
  }
  const countryName = translate(`zoneShortName.${zoneCode}.countryName`);
  if (!countryName) {
    return zoneName;
  }

  if (zoneName.length > limit) {
    return `${zoneName.substring(0, limit)}... (${countryName})`;
  }

  return `${zoneName} (${countryName})`;
}

