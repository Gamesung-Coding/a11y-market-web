import { useGetSellerDetail } from '@/api/admin/queries';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle, Circle } from 'lucide-react';
import { ErrorEmpty } from '../main/error-empty';
import { LoadingEmpty } from '../main/loading-empty';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Item, ItemContent } from '../ui/item';
import { ScrollArea } from '../ui/scroll-area';

interface SellerDetailInfoProps {
  sellerId: string;
}

export const SellerDetailInfo = ({ sellerId }: SellerDetailInfoProps) => {
  const { data: sellerDetail, error, isLoading } = useGetSellerDetail(sellerId);

  const navigate = useNavigate();

  // variables and constants
  const gradeColors: Record<string, string> = {
    NEWER: 'bg-yellow-200 text-yellow-800 border border-yellow-800',
    REGULAR: 'bg-blue-200 text-blue-800 border border-blue-800',
    TRUSTED: 'bg-green-200 text-green-800 border border-green-800',
  };

  const productInfo = {
    products: sellerDetail?.products || [],
    approvedProducts:
      sellerDetail?.products.filter((p) => p.productStatus === 'APPROVED').length || 0,
    pendingProducts:
      sellerDetail?.products.filter((p) => p.productStatus === 'PENDING').length || 0,
    rejectedProducts:
      sellerDetail?.products.filter((p) => p.productStatus === 'REJECTED').length || 0,
  };

  // functions
  const getA11yGuaranteeBadge = () => {
    if (sellerDetail?.isA11yGuarantee) {
      return (
        <Badge className='border border-green-800 bg-green-200 text-green-800'>
          <CheckCircle className='mr-1 inline-block h-4 w-4' />
          인증됨
        </Badge>
      );
    } else {
      return (
        <Badge className='border border-red-800 bg-red-200 text-red-800'>
          <Circle className='mr-1 inline-block h-4 w-4' />
          인증되지 않음
        </Badge>
      );
    }
  };

  const getProductStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <Badge className='border border-green-800 bg-green-200 text-green-800'>승인됨</Badge>
        );
      case 'PENDING':
        return (
          <Badge className='border border-yellow-800 bg-yellow-200 text-yellow-800'>보류 중</Badge>
        );
      case 'REJECTED':
        return <Badge className='border border-red-800 bg-red-200 text-red-800'>거부됨</Badge>;
      default:
        return (
          <Badge className='border border-gray-800 bg-gray-200 text-gray-800'>알 수 없음</Badge>
        );
    }
  };

  // render
  if (isLoading) {
    return <LoadingEmpty />;
  }

  if (error || !sellerDetail) {
    return (
      <ErrorEmpty
        prevPath='/admin/sellers'
        message='판매자 상세 정보 조회 중 오류가 발생했습니다.'
      />
    );
  }

  return (
    <ScrollArea className='flex h-[calc(100vh-8rem)] flex-col gap-6'>
      <Card className='gap-0 p-6'>
        <CardHeader>
          <CardTitle>
            <h2 className='text-xl font-semibold'>{`판매자 이름: ${sellerDetail.sellerName}`}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-2'>{`사업자 등록번호: ${sellerDetail.businessNumber}`}</p>
          <p className='mb-2'>
            <span>판매자 등급: </span>
            <Badge
              variant='secondary'
              className={`px-2 py-1 font-bold ${gradeColors[sellerDetail.sellerGrade] || ''}`}
            >
              {sellerDetail.sellerGrade === 'NEWER'
                ? '신규'
                : sellerDetail.sellerGrade === 'REGULAR'
                  ? '일반'
                  : '신뢰'}
            </Badge>
          </p>
          <p className='mb-2'>
            <span>접근성 인증 상태: </span>
            {getA11yGuaranteeBadge()}
          </p>
          <p className='mb-2'>{`판매자 소개: ${sellerDetail.storeIntro}`}</p>
        </CardContent>
      </Card>
      <Card className='gap-0 p-6'>
        <CardHeader>
          <CardTitle>
            <h2 className='text-xl font-semibold'>연락처 정보</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-2'>{`이메일: ${sellerDetail.contactEmail}`}</p>
          <p className='mb-2'>{`전화번호: ${sellerDetail.contactPhone}`}</p>
        </CardContent>
      </Card>
      <Card className='gap-0 p-6'>
        <CardHeader>
          <CardTitle>
            <h2 className='text-xl font-semibold'>상품 정보</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className='max-w-full'>
          <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-4'>
            <Item
              className='p-4 text-center'
              variant='outline'
            >
              <ItemContent>
                <h3 className='text-lg font-bold'>총 상품 수</h3>
                <p className='mt-2 text-2xl font-semibold'>{productInfo.products.length}</p>
              </ItemContent>
            </Item>
            <Item
              className='p-4 text-center'
              variant='outline'
            >
              <ItemContent>
                <h3 className='text-lg font-bold'>승인된 상품 수</h3>
                <p className='mt-2 text-2xl font-semibold'>{productInfo.approvedProducts}</p>
              </ItemContent>
            </Item>
            <Item
              className='p-4 text-center'
              variant='outline'
            >
              <ItemContent>
                <h3 className='text-lg font-bold'>보류 중인 상품 수</h3>
                <p className='mt-2 text-2xl font-semibold'>{productInfo.pendingProducts}</p>
              </ItemContent>
            </Item>
            <Item
              className='p-4 text-center'
              variant='outline'
            >
              <ItemContent>
                <h3 className='text-lg font-bold'>거부된 상품 수</h3>
                <p className='mt-2 text-2xl font-semibold'>{productInfo.rejectedProducts}</p>
              </ItemContent>
            </Item>
          </div>
        </CardContent>
      </Card>
      <Card className='gap-0 p-6'>
        <CardHeader>
          <CardTitle>
            <h2 className='text-xl font-semibold'>상품 목록</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className='max-w-full'>
          {productInfo.products.length === 0 ? (
            <p>등록된 상품이 없습니다.</p>
          ) : (
            <div className='flex flex-col gap-4'>
              {productInfo.products.map((product) => (
                <Item
                  key={product.productId}
                  className='cursor-pointer p-4'
                  variant='outline'
                  onClick={(e) => {
                    e.preventDefault();
                    navigate({
                      to: '/products/$productId',
                      params: { productId: product.productId },
                    });
                  }}
                >
                  <ItemContent>
                    <h3 className='text-lg font-bold'>{product.productName}</h3>
                    <p className='mt-2'>{`상품 ID: ${product.productId}`}</p>
                    <p className='mt-1'>
                      <span>상태: </span>
                      {getProductStatusBadge(product.productStatus)}
                    </p>
                  </ItemContent>
                </Item>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
};
