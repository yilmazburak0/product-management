import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ProductTable.module.css';
import { ProductTableProps } from '../../types';



const ProductTable: React.FC<ProductTableProps> = ({ 
  products, 
  onEditProduct, 
  onDeleteProduct 
}) => {
  if (products.length === 0) {
    return (
      <Box className={styles.emptyState}>
        <Typography variant="subtitle1">No products available</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className={styles.descriptionCell}>
                {product.description}
              </TableCell>
              <TableCell align="right" className={styles.actionButtons}>
                <IconButton 
                  aria-label="edit" 
                  color="primary" 
                  onClick={() => onEditProduct(product)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  aria-label="delete" 
                  color="error" 
                  onClick={() => onDeleteProduct(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;