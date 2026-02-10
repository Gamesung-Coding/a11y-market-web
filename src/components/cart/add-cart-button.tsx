import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAddCartItem } from '@/hooks/use-cart-mutation';
import { cn } from '@/lib/utils';
import type { MonthlyPopularProduct } from '@/types/main-page';
import type { Product, SimpleProductInfo } from '@/types/product';
import { CircleCheck, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AddCartButtonProps {
  product: SimpleProductInfo | Product | MonthlyPopularProduct;
  quantity?: number;
  className?: string;
}

export const AddCartButton = ({ product, quantity = 1, className = '' }: AddCartButtonProps) => {
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  const { mutate: addCart, isPending } = useAddCartItem();

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation(); // 이벤트 버블링 방지

    addCart(
      {
        productId: product.productId,
        quantity,
      },
      {
        onSuccess: () => {
          toast.success(`${product.productName} 상품이 장바구니에 추가되었습니다.`);
          setIsAddedSuccess(true);
          setTimeout(() => {
            setIsAddedSuccess(false);
          }, 2000);
        },

        onError: () => {
          // 기본적인 오류 처리는 useAddCartItem 훅에서 처리
        },
      },
    );
  };

  const baseStyle = cn('w-full gap-2', className);
  const addedStyle = cn('w-full gap-2 bg-green-600 hover:bg-green-700', className);

  if (isAddedSuccess) {
    return (
      <Button
        className={addedStyle}
        aria-label={`${product.productName} 장바구니에 추가됨`}
        disabled
      >
        <CircleCheck
          className='size-4'
          aria-hidden='true'
        />
        추가됨
      </Button>
    );
  }

  return (
    <Button
      className={baseStyle}
      aria-label={`${product.productName} 장바구니에 담기`}
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <ShoppingCart
            className='size-4'
            aria-hidden='true'
          />
          장바구니
        </>
      )}
    </Button>
  );
};
