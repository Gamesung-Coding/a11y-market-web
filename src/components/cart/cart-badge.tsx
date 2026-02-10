import { Badge } from '@/components/ui/badge';
import { useCartCount } from '@/hooks/use-cart';

export const CartBadge = () => {
  const { data: cartCount } = useCartCount();

  if (!cartCount) {
    return null;
  }

  return (
    <Badge className='absolute -top-1 -right-1 flex size-5 items-center justify-center p-0 text-xs'>
      {cartCount}
    </Badge>
  );
};
