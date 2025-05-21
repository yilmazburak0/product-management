import React, { useState } from 'react';
import {
  Container, 
  Typography, 
  Button, 
  Box,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import ProductTable from '../../components/ProductTable/ProductTable';
import ProductFormModal from '../../components/ProductFormModal/ProductFormModal';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { Product } from '../../types';

import styles from './ProductManagementPage.module.css';
import { initialProducts, productCategories } from '../../utils/mockData';
import { ProductManagementPageProps } from '../../types';

const ProductManagementPage: React.FC<ProductManagementPageProps> = ({ onLogout }) => {
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

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Management System
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={onLogout}
            edge="end"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container className={styles.container}>
        <Box className={styles.header}>
          <Typography variant="h5" component="h1" className={styles.title}>
            Products
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Box>

        <ProductTable 
          products={products}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteClick}
        />

        <ProductFormModal 
          open={openFormModal}
          onClose={() => setOpenFormModal(false)}
          onSave={handleSaveProduct}
          product={selectedProduct}
          categories={productCategories}
        />

        <ConfirmDialog 
          open={openConfirmDialog}
          title="Delete Product"
          description={selectedProductToDelete ? 
            `Are you sure you want to delete ${selectedProductToDelete.name}? This action cannot be undone.` : 
            "Are you sure you want to delete this product?"
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setOpenConfirmDialog(false)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </Container>
    </>
  );
};

export default ProductManagementPage;