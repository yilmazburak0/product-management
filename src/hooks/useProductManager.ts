import { useState } from 'react';
import { Product } from '../types';
import { initialProducts } from '../utils/mockData';

export function useProductManager() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setOpenFormModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenFormModal(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (product.id === 0) {
      const newId = Math.max(0, ...products.map(p => p.id)) + 1;
      const newProduct = { ...product, id: newId };
      setProducts([...products, newProduct]);
    } else {
      setProducts(products.map(p => p.id === product.id ? product : p));
    }
    setOpenFormModal(false);
  };

  const handleDeleteClick = (productId: number) => {
    const productToDelete = products.find(p => p.id === productId) || null;
    setSelectedProductToDelete(productToDelete);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductToDelete) {
      setProducts(products.filter(p => p.id !== selectedProductToDelete.id));
      setOpenConfirmDialog(false);
      setSelectedProductToDelete(null);
    }
  };

  return {
    products,
    selectedProduct,
    openFormModal,
    openConfirmDialog,
    selectedProductToDelete,
    handleAddProduct,
    handleEditProduct,
    handleSaveProduct,
    handleDeleteClick,
    handleConfirmDelete,
    setOpenFormModal,
    setOpenConfirmDialog
  };
}
