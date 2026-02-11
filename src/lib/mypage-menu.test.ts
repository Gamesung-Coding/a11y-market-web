import { describe, expect, it } from 'vitest';
import { getMyPageMenu } from './mypage-menu';

describe('getMypageMenu', () => {
  it('should include "판매자 신청" menu item when the userRole is "USER"', () => {
    const menus = getMyPageMenu('USER');
    expect(menus).toEqual(
      expect.arrayContaining([expect.objectContaining({ label: '판매자 신청' })]),
    );

    expect(menus).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ label: '판매자 센터' })]),
    );
  });

  it('should include "판매자 센터" menu item when the userRole is "SELLER"', () => {
    const menus = getMyPageMenu('SELLER');
    expect(menus).toEqual(
      expect.arrayContaining([expect.objectContaining({ label: '판매자 센터' })]),
    );

    expect(menus).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ label: '판매자 신청' })]),
    );
  });

  it('should not include "판매자 신청" or "판매자 센터" menu items when the userRole is "ADMIN"', () => {
    const menus = getMyPageMenu('ADMIN');
    expect(menus).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ label: '판매자 신청' })]),
    );
    expect(menus).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ label: '판매자 센터' })]),
    );
  });
});
