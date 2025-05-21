import {
  Container, 
  Typography, 
  Button, 
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ProductTable from '../../components/ProductTable/ProductTable';
import ProductFormModal from '../../components/ProductFormModal/ProductFormModal';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import HeaderBar from '../../components/Headbar/Headbar';

import styles from './ProductManagementPage.module.css';
import { productCategories } from '../../utils/mockData';
import { ProductManagementPageProps } from '../../types';

import { useProductManager } from '../../hooks/useProductManager';

const ProductManagementPage: React.FC<ProductManagementPageProps> = ({ onLogout }) => {
  const {
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
    setOpenConfirmDialog,
  } = useProductManager();

  return (
    <>
      <HeaderBar title="Product Management System" onLogout={onLogout} />
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