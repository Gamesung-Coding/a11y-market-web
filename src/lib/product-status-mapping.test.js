import { describe, expect, it } from 'vitest';
import { getProductStatusLabel, getProductStatusStyle } from './product-status-mapping';

describe('ProductStatusMapping', () => {
  describe('getProductStatusLabel', () => {
    it('should return "승인 대기" for status "PENDING"', () => {
      expect(getProductStatusLabel('PENDING')).toBe('승인 대기');
    });

    it('should return "판매 중" for status "APPROVED"', () => {
      expect(getProductStatusLabel('APPROVED')).toBe('판매 중');
    });

    it('should return "승인 거절" for status "REJECTED"', () => {
      expect(getProductStatusLabel('REJECTED')).toBe('승인 거절');
    });

    it('should return "판매 중지" for status "PAUSED"', () => {
      expect(getProductStatusLabel('PAUSED')).toBe('판매 중지');
    });

    it('should return "삭제됨" for status "DELETED"', () => {
      expect(getProductStatusLabel('DELETED')).toBe('삭제됨');
    });

    it('should return "알 수 없음" for unknown status', () => {
      expect(getProductStatusLabel('UNKNOWN_STATUS')).toBe('알 수 없음');
    });
  });

  describe('getProductStatusStyle', () => {
    it('should return green color for status "APPROVED"', () => {
      const style = getProductStatusStyle('APPROVED');
      expect(style).toContain('bg-green-100');
      expect(style).toContain('text-green-800');
    });

    it('should return blue color for status "PENDING"', () => {
      const style = getProductStatusStyle('PENDING');
      expect(style).toContain('bg-blue-100');
    });

    it('should return red color for status "REJECTED"', () => {
      const style = getProductStatusStyle('REJECTED');
      expect(style).toContain('bg-red-100');
    });

    it('should return neutral color for unknown status', () => {
      const style = getProductStatusStyle('UNKNOWN_STATUS');
      expect(style).toContain('bg-neutral-100');
    });
  });
});
