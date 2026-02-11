import type { MonthlyPopularProduct } from '@/api/main/types';
import type { Product, SimpleProductInfo } from '@/api/product/types';
import { AddCartButton } from '@/components/cart/add-cart-button';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';

interface ProductCardProps {
  product: SimpleProductInfo | Product | MonthlyPopularProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = product.productPrice.toLocaleString('ko-KR');

  const getImageUrl = () => {
    if ('productImages' in product && product.productImages.length > 0) {
      return product.productImages.filter((img) => img.imageSequence === 0)[0]?.imageUrl || '';
    } else if ('productImageUrl' in product) {
      return product.productImageUrl;
    } else {
      return ''; // Fallback
    }
  };

  return (
    <article
      className='group rounded-lg border shadow-sm transition-shadow hover:shadow-md'
      aria-label={`${product.productName} 상품 카드`}
    >
      <Link to={`/products/${product.productId}`}>
        <div className='relative aspect-square overflow-hidden rounded-t-lg'>
          <ImageWithFallback
            src={getImageUrl()}
            alt={product.productName}
            className='size-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
          {'ranking' in product && product.ranking && (
            <Badge
              className='absolute top-2 left-2 bg-red-500 text-white'
              aria-label={`인기 순위 ${product.ranking}`}
            >
              {product.ranking}위
            </Badge>
          )}
        </div>

        <div className='p-4'>
          <h3 className='mb-2 line-clamp-2 min-h-14 text-lg'>{product.productName}</h3>

          <div className='mb-3 flex items-center justify-between'>
            <span
              className='text-xl'
              aria-label={`가격 ${product.productPrice.toLocaleString('ko-KR')}원`}
            >
              {formattedPrice}원
            </span>
          </div>

          <AddCartButton product={product} />
        </div>
      </Link>
    </article>
  );
};
