import { adminApi } from '@/api/admin';
import type { Seller } from '@/api/admin/types';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { SellerDetailInfo } from './seller-detail-info';

interface SellerInfoItemProps extends React.ComponentPropsWithoutRef<typeof Item> {
  seller: Seller;
}

export const SellerInfoItem = ({ seller, ...props }: SellerInfoItemProps) => {
  const [grade, setGrade] = useState(seller.sellerGrade);
  const [isA11yGuarantee, setIsA11yGuarantee] = useState(seller.isA11yGuarantee);
  const [isUpdating, setIsUpdating] = useState(false);

  const initialSellerInfo = {
    sellerName: seller.sellerName,
    businessNumber: seller.businessNumber,
    sellerGrade: seller.sellerGrade,
    sellerIntro: seller.storeIntro,
    a11yGuarantee: seller.isA11yGuarantee,
  };

  const gradeColors: Record<string, string> = {
    NEWER: 'bg-yellow-200 text-yellow-800 border border-yellow-800',
    REGULAR: 'bg-blue-200 text-blue-800 border border-blue-800',
    TRUSTED: 'bg-green-200 text-green-800 border border-green-800',
  };

  const handleChangeGrade = async (newGrade: 'NEWER' | 'REGULAR' | 'TRUSTED') => {
    setIsUpdating(true);
    try {
      const resp = await adminApi.updateSellerInfo(seller.sellerId, {
        ...initialSellerInfo,
        sellerGrade: newGrade,
      });

      if (resp.status !== 204) {
        throw new Error('Failed to update seller grade');
      }

      setGrade(newGrade);
    } catch (err) {
      console.error('Error updating seller grade:', err);
      toast.error('판매자 등급 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangeA11yGuarantee = async () => {
    setIsUpdating(true);
    try {
      const resp = await adminApi.updateSellerInfo(seller.sellerId, {
        ...initialSellerInfo,
        a11yGuarantee: !seller.isA11yGuarantee,
      });

      if (resp.status !== 204) {
        throw new Error('Failed to update accessibility guarantee status');
      }

      setIsA11yGuarantee(!isA11yGuarantee);
    } catch (err) {
      console.error('Error updating accessibility guarantee status:', err);
      toast.error('접근성 인증 상태 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Item
      variant='outline'
      {...props}
    >
      <ItemContent>
        <ItemTitle>
          <div className='flex justify-center'>
            <span className='text-lg font-bold'>{seller.sellerName}</span>
          </div>
          {seller.isA11yGuarantee && (
            <Badge
              variant='secondary'
              className='ml-2 flex items-center gap-1 bg-blue-500 px-2 py-1 font-bold text-white'
            >
              <CheckCircle />
              접근성 인증
            </Badge>
          )}
          <Badge
            variant='secondary'
            className={`px-2 py-1 font-bold ${gradeColors[seller.sellerGrade]}`}
          >
            {seller.sellerGrade === 'NEWER'
              ? '신규'
              : seller.sellerGrade === 'REGULAR'
                ? '일반'
                : '신뢰'}
          </Badge>
        </ItemTitle>
        <ItemDescription className='text-primary flex flex-col space-y-1'>
          <span>
            <strong>이메일:</strong> {seller.contactEmail}
          </span>
          <span>
            <strong>사업자등록번호:</strong> {seller.businessNumber}
          </span>
        </ItemDescription>
      </ItemContent>
      <Separator
        orientation='horizontal'
        className='mx-4 h-6'
      />
      <ItemActions className='w-full flex-col gap-2'>
        <span className='ml-2 self-start text-left font-bold'>등급 조정</span>
        <div className='flow-row flex w-full items-center gap-4'>
          <Select
            onValueChange={(val) => handleChangeGrade(val as 'NEWER' | 'REGULAR' | 'TRUSTED')}
            value={grade}
            disabled={isUpdating}
          >
            <SelectTrigger className='w-full flex-1'>
              <SelectValue placeholder='등급 선택' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='NEWER'>신규</SelectItem>
              <SelectItem value='REGULAR'>일반</SelectItem>
              <SelectItem value='TRUSTED'>신뢰</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant='outline'
            className='flex-1'
            disabled={isUpdating}
            onClick={handleChangeA11yGuarantee}
          >
            {isA11yGuarantee ? (
              <>
                <Circle className='mr-2' />
                접근성 인증 회수
              </>
            ) : (
              <>
                <CheckCircle className='mr-2' />
                접근성 인증 부여
              </>
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                className='flex-1'
                disabled={isUpdating}
              >
                상세보기
              </Button>
            </SheetTrigger>
            <SheetContent className='w-[60%] sm:max-w-full'>
              <SheetHeader>
                <SheetTitle>
                  <h2 className='text-center text-2xl font-bold'>판매자 상세 정보</h2>
                </SheetTitle>
                <SheetDescription>
                  <SellerDetailInfo sellerId={seller.sellerId} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </ItemActions>
    </Item>
  );
};
