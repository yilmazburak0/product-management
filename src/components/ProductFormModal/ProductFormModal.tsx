import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText
} from '@mui/material';

import styles from './ProductFormModal.module.css';
import { ProductFormModalProps } from '../../types';
import { useProductForm } from '../../hooks/useProductForm';

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  open,
  onClose,
  onSave,
  product,
  categories
}) => {
  const {
    formData,
    errors,
    handleChange,
    handleCategoryChange,
    validate
  } = useProductForm(product || null, open);

  const isEditMode = !!product;
  const modalTitle = isEditMode ? 'Edit Product' : 'Add New Product';

  const handleSubmit = () => {
    if (validate()) {
      const validatedProduct = {
        ...formData,
        price: typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price
      };

      onSave(validatedProduct);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className={styles.dialog}
    >
      <DialogTitle>{modalTitle}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Product Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          className={styles.formField}
        />

        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          className={styles.formField}
        />

        <FormControl
          fullWidth
          margin="dense"
          variant="outlined"
          error={!!errors.category}
          className={styles.formField}
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
        </FormControl>

        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}
          className={styles.formField}
        />
      </DialogContent>

      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditMode ? 'Save Changes' : 'Add Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormModal;