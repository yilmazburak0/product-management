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
  Box,
  useMediaQuery,
  useTheme,
  Tooltip
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (products.length === 0) {
    return (
      <Box className={styles.emptyState}>
        <Typography variant="subtitle1">No products available</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table aria-label="product table" size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            {!isMobile && <TableCell>ID</TableCell>}
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            {!isMobile && <TableCell>Description</TableCell>}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <TableRow>
                {!isMobile && <TableCell>{product.id}</TableCell>}
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                {!isMobile && (
                  <TableCell className={styles.descriptionCell}>
                    <Tooltip title={product.description} placement="top" arrow>
                      <span>{product.description}</span>
                    </Tooltip>
                  </TableCell>
                )}
                <TableCell align="right" className={styles.actionButtons}>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => onEditProduct(product)}
                    size={isMobile ? "small" : "medium"}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => onDeleteProduct(product.id)}
                    size={isMobile ? "small" : "medium"}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              
              {isMobile && (
                <TableRow>
                  <TableCell colSpan={4} className={styles.mobileDescription}>
                    {product.description}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;