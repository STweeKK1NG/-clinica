import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface SelectProductModalProps {
  onSelect: (product: Product) => void;
  onClose: () => void;
}

export default function SelectProductModal({ onSelect, onClose }: SelectProductModalProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Seleccionar Producto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {products.map(product => (
              <li
                key={product.id}
                className="py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelect(product)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {product.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${product.value.toLocaleString('es-CL')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}