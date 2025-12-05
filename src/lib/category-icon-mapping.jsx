import { HeartPlus, Laptop, Package, Shirt, Utensils } from 'lucide-react';

export const IconMap = ({ categoryName, className }) => {
  if (categoryName == null) {
    return <Package className={className} />;
  }

  if (categoryName.includes('디지털')) {
    return <Laptop className={className} />;
  } else if (categoryName.includes('의류')) {
    return <Shirt className={className} />;
  } else if (categoryName.includes('건강')) {
    return <HeartPlus className={className} />;
  } else if (categoryName.includes('식품')) {
    return <Utensils className={className} />;
  } else {
    return <Package className={className} />;
  }
};
