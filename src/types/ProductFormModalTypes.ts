import { Product } from "./ProductTypes";

export interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
  categories: string[];
}
