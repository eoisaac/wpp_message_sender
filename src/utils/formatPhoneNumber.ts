import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { DefaultException } from '../app/models/defaultException';

export const formatPhoneNumber = (number: string) => {
  if (number.length === 0) {
    throw new DefaultException({
      code: 400,
      message: 'You must enter a phone number!',
    });
  }

  if (!isValidPhoneNumber(number, 'BR')) {
    throw new DefaultException({
      code: 400,
      message: 'The phone number is not valid!',
    });
  }

  const phoneNumber = parsePhoneNumber(number, 'BR')
    .format('E.164')
    .replace('+', '');

  return phoneNumber;
};
