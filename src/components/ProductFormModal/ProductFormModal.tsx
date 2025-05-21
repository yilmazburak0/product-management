import React, { useState, useEffect } from 'react';
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
import { Product } from '../../types/ProductTypes';
import styles from './ProductFormModal.module.css';
import { ProductFormModalProps } from '../../types';

const initialProductState: Product = {
  id: 0,
  name: '',
  price: 0,
  description: '',
  category: ''
};

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  open,
  onClose,
  onSave,
  product,
  categories
}) => {
  const [formData, setFormData] = useState<Product>(initialProductState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Determine if we're in edit mode
  const isEditMode = !!product;
  const modalTitle = isEditMode ? 'Edit Product' : 'Add New Product';

  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (open) {
      setFormData(product || initialProductState);
      setErrors({});
    }
  }, [open, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : parseFloat(value)) : value
    }));
    
    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }));
    
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than zero';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Ensure price is a number
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
            {categories.map(category => (
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