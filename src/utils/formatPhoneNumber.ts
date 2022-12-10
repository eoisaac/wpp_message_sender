import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

export const formatPhoneNumber = (number: string) => {
  if (number.length === 0) {
    throw new Error('You must enter a phone number!');
  }

  if (!isValidPhoneNumber(number, 'BR')) {
    throw new Error('The phone number is not valid!');
  }

  const phoneNumber = parsePhoneNumber(number, 'BR')
    .format('E.164')
    .replace('+', '');

  return phoneNumber;
};
