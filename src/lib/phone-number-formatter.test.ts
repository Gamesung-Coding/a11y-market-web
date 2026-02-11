import { describe, expect, it } from 'vitest';
import { formatPhoneNumber } from './phone-number-formatter';

describe('Text phone number formatter', () => {
  it('should format phone numbers using dashes when a number of 11 digits is provided', () => {
    const input = '01012345678';
    expect(formatPhoneNumber(input)).toBe('010-1234-5678');
  });

  it('should format phone numbers using dashes when a number of 10 digits is provided', () => {
    const input = '0212345678';
    expect(formatPhoneNumber(input)).toBe('021-234-5678');
  });

  it('should format phone numbers using dashes when a number of less than 7 digits is provided', () => {
    expect(formatPhoneNumber('0212345')).toBe('021-2345');
  });

  it('should return the original input when it does not match expected phone number patterns', () => {
    const input = '123';
    expect(formatPhoneNumber(input)).toBe(input);
  });
});
