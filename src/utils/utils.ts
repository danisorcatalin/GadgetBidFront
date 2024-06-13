/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import i18n from 'i18next';
import { SiteName } from '../constants';
import { utcToZonedTime, format } from 'date-fns-tz';
import stc from 'string-to-color';
import Resizer from 'react-image-file-resizer';
import { CampaignCurrency } from 'types/campaign';

export const formatPageTitle = (title: string): string => `${title} | ${SiteName}`;

export const mergeTwoObjectArraysByProperty = (arr1, arr2, prop: string) => {
  return [
    ...arr1
      .concat(arr2)
      .reduce((m, o) => m.set(o[prop], Object.assign(m.get(o[prop]) || {}, o)), new Map())
      .values(),
  ];
};

export const dataURIToBlob = (dataURI: string, mimeString?: string): Blob => {
  const splitDataURI = dataURI.split(',');
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
  if (!mimeString) {
    mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  }
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};

export const blobToFile = (blob: Blob, fileName: string): File => {
  const b = blob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b['lastModifiedDate'] = new Date();
  b['name'] = fileName;

  //Cast to a File() type
  return <File>blob;
};

export const generateSeededHexColor = (seed): string => stc(seed);

export const getLanguage = (): string => i18n.language || window.localStorage.i18nextLng;
export const getLocale = (language = getLanguage()): string => {
  switch (language) {
    case 'ro':
      return 'ro-RO';
    case 'en':
      return 'en-GB';
  }
};

export const dateTimeFormat = (date: number | Date, options?: unknown, locale?: string): string => {
  if (!locale) {
    locale = getLocale();
  }

  if (!options) {
    options = { dateStyle: 'full', timeStyle: 'long' };
  }

  return new Intl.DateTimeFormat(locale).format(date);
};

export const daysUntil = (date: number | Date): string => {
  return Math.ceil(
    Math.abs(new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ).toString();
};

export const numberFormat = (
  number: number,
  campaignCurrency: CampaignCurrency,
  options?: unknown
): string => {
  switch (campaignCurrency) {
    case 'RON':
      options = {
        style: 'currency',
        currency: 'RON',
      };
      break;
    case 'EUR':
      options = {
        style: 'currency',
        currency: 'EUR',
      };
      break;
    default:
      options = {
        style: 'currency',
        currency: 'EUR',
      };
  }

  return new Intl.NumberFormat(undefined, options).format(number);
};

export const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const convertUtcDateToClientTimeZone = (date: string | number | Date) => {
  const zonedDate = utcToZonedTime(date, clientTimeZone);
  const pattern = "d.M.yyyy HH:mm:ss 'GMT' XXX (z)";
  const output = format(zonedDate, pattern, { timeZone: clientTimeZone });

  return output;
};

export const isImageFile = (file: File): boolean => {
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  const fileType = file['type'];
  if (validImageTypes.includes(fileType)) {
    return true;
  }
  return false;
};

export const resizeFile = (file: File, width = 3840, height = 2160): Promise<string> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      'JPEG',
      100,
      0,
      (uri: string) => {
        resolve(uri);
      },
      'base64'
    );
  });
};
