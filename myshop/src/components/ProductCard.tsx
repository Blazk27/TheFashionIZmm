import { formatPrice } from '../lib/currency';
import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  if (product.stock <= 0 || !product.is_active) return null;

  return (
    <div className="product-card cursor-pointer group" onClick={() => onViewDetails?.(product)}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-blue-50">
        <img
          src={product.image_url}
          alt={product.title}
          className="product-image w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image'; }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="px-4 py-2 bg-white/90 text-blue-700 text-sm font-semibold rounded-xl shadow">
            View Details
          </span>
        </div>
        {/* Badges */}
        {/* Image count badge */}
        {product.images && product.images.length > 0 && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/50 text-white text-xs rounded-lg">
            📷 {(product.images.length + 1)}
          </div>
        )}
        {product.is_featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow">
            ⭐ HOT
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 text-gray-600 text-xs font-medium rounded-lg shadow-sm">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold text-sm mb-1 truncate">{product.title}</h3>

        {/* Size & Color */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.thc_percent && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-md border border-blue-100">
              📐 {product.thc_percent}
            </span>
          )}
          {product.cbd_percent && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-md border border-blue-100">
              🎨 {product.cbd_percent}
            </span>
          )}
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
          <button onClick={handleAddToCart} disabled={isAdding}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              isAdding
                ? 'bg-emerald-500 text-white scale-95'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200'
            }`}>
            <ShoppingCart className="w-3.5 h-3.5" />
            {isAdding ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
