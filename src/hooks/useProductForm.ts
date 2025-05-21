import { useState, useEffect } from 'react';
import { Product } from '../types/ProductTypes';

const initialProductState: Product = {
  id: 0,
  name: '',
  price: 0,
  description: '',
  category: ''
};

export function useProductForm(product: Product | null, open: boolean) {
  const [formData, setFormData] = useState<Product>(initialProductState);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than zero';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    setFormData,
    handleChange,
    handleCategoryChange,
    validate
  };
}
