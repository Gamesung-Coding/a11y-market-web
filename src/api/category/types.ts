export interface Category {
  categoryId: string;
  categoryName: string;
  subCategories: Category[];
}
