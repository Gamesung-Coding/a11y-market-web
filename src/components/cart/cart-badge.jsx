import { Badge } from '@/components/ui/badge';
import { fetchCartCount } from '@/store/cart-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const CartBadge = () => {
  const { itemCount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  return (
    <Badge className='absolute -top-1 -right-1 flex size-5 items-center justify-center p-0 text-xs'>
      {itemCount}
    </Badge>
  );
};
