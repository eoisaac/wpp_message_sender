import { describe, expect, it } from 'vitest';
import { formatPhoneNumber } from '../formatPhoneNumber';

describe('format phone number', () => {
  it('should format phone number into BR pattern and remove + sign', () => {
    const number = '+5531012345678';
    const formattedNumber = formatPhoneNumber(number);

    expect(formattedNumber).toBe('5531012345678');
  });

  it('should throw error on empty phone number', () => {
    const number = '';

    const formatExec = () => {
      formatPhoneNumber(number);
    };

    expect(formatExec).toThrowError('You must enter a phone number!');
  });

  it('should throw error on invalid phone number pattern', () => {
    const number = '+131971546159';

    const formatExec = () => {
      formatPhoneNumber(number);
    };

    expect(formatExec).toThrowError('The phone number is not valid!');
  });
});
